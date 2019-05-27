import { httpRequest, IRequestConfig, Headers } from '../src';
import { expect } from 'chai';

describe('Request', () => {
    let file: any;
    describe('default request config', () => {
        before(() => {
            httpRequest.setRequest();
        });
        
        it('has to recibe all the users', async () => { 
            const url = 'http://localhost:3000/users';
            const response = await httpRequest.sendRequest({
                url,
                method: 'get'
            });

            expect(response).has.to.length(4);
        });

        it('has to handler the error', async() => {
            const url = 'http://localhost:3000/users/6';

            try {
                const response = await httpRequest.sendRequest({
                    url,
                    method: 'get'
                });

                throw new Error('The request should not be success');
            } catch(error) {
                expect(error).has.to.be.equal('404. Not Found');
            }
        });

        it('has to recibe one user', async() => {
            const url = 'http://localhost:3000/users/3';
            const response: any = await httpRequest.sendRequest({
                url,
                method: 'get'
            });

            expect(response.name).has.to.be.equal('Narges');
        });

        it('has to add user', async() => {
            const url = 'http://localhost:3000/users';
            const user = {
                id: 5,
                name: 'Pepe',
                permission: 'user'
            };

            const response: any = await httpRequest.sendRequest({
                url,
                method: 'post',
                body: user
            });

            const isAdded = response.some((user: any) => user.name === 'Pepe');

            expect(response).has.to.length(5);
            expect(isAdded).has.to.be.true;
        });

        it('has to update user', async() => {
            const url = 'http://localhost:3000/users/5';
            const data = {
                permission: 'admin'
            }

            const response: any = await httpRequest.sendRequest({
                url,
                method: 'put',
                body: data
            });

            const isUpdate = response.some((user:any) => user.permission === 'admin');

            expect(isUpdate).has.to.be.true;
        });

        it('has to delete user', async() => {
            const url = 'http://localhost:3000/users/5';
            const response: any = await httpRequest.sendRequest({
                url,
                method: 'delete',
            });

            const isStillExisting = response.some((user: any) => user.name === 'Pepe');

            expect(response).has.to.length(4);
            expect(isStillExisting).has.to.be.false;
        });

        it('has to upload file', async() => {
            const url = 'http://localhost:3000/upload';

            const blob = new Blob(['abc123'], {type: 'text/plain'});
            
            file = await httpRequest.uploadFile({
                url,
                file: blob,
                responseType: 'json',
                name: 'test'
            });


            expect(file.fieldname).has.to.be.equal('test');
        });

        it('has to delete file', async() => {
            const url = `http://localhost:3000/upload/${file.filename}`;
            const response = await httpRequest.sendRequest({
                url,
                method: 'delete',
                responseType: 'text'
            });

            expect(response).has.to.be.equal('file removed');
        })

        it('has to set the credentials to false', () => {
            const request = httpRequest.request;
            expect(request.withCredentials).has.to.be.false;
        })
    });

    describe('setting request before', () => {
        before(() => {
            const headers: Headers  = {
                'Accept': 'application/json, text/*'
            } 
            const options: IRequestConfig = {
                responseType: 'text',
                headers,
                credentials: true,
                domain: 'http://localhost:3000'
            }

            httpRequest.setRequest(options);
        });

        it('has to response a string', async () => { 
            const url = '/users';
            const response = await httpRequest.sendRequest({
                url,
                method: 'get'
            });

            expect(response).has.to.be.string;
        });

        it('has to ignore the default domain', async () => {
            const url = 'http://localhost:3000/users';

            const response = await httpRequest.sendRequest({
                url,
                method: 'get'
            });

            expect(response).has.to.be.string;
        });

        it('has to set the credentials to true', () => {
            const request = httpRequest.request;
            expect(request.withCredentials).has.to.be.true;
        });

        it('has to set auth in base64', async() => {
            const url = 'http://localhost:3000/auth';
            const options: IRequestConfig = {
                authType: "base64",
                auth: {
                    username: "test",
                    password: "123456",
                }
            };

            httpRequest.setRequest(options);

            const response = await httpRequest.sendRequest({
                url,
                method: 'get'
            });

            expect(response.authorization).to.be.include('Basic');
        });
    });
});