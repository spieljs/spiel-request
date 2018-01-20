import { httpRequest, RequestConfig, Headers } from '../src';
import { expect } from 'chai';

describe('Request', () => {
    describe('default request config', () => {
        before(() => {
            httpRequest.setRequest();
        });
        
        it('has to recibe all the users', async () => { 
            let url = 'http://localhost:3000/users';
            const response = await httpRequest.sendRequest({
                url: url,
                method: 'get'
            });

            expect(response).has.to.length(4);
        });

        it('has to handler the error', async() => {
            let url = 'http://localhost:3000/users/6';

            try {
                const response = await httpRequest.sendRequest({
                    url: url,
                    method: 'get'
                });

                throw new Error('The request should not be success');
            } catch(error) {
                expect(error).has.to.be.equal('404. Not Found');
            }
        });

        it('has to recibe one user', async() => {
            let url = 'http://localhost:3000/users/3';
            const response: any = await httpRequest.sendRequest({
                url: url,
                method: 'get'
            });

            expect(response.name).has.to.be.equal('Narges');
        });
    });

    describe('setting request before', () => {
        before(() => {
            let headers: Headers  = {
                'Accept': 'application/json, text/*'
            } 
            let options: RequestConfig = {
                responseType: 'text',
                headers,
                credentials: true,
                domain: 'http://localhost:3000'
            }

            httpRequest.setRequest(options);
        });

        it('has to response a string', async () => { 
            let url = '/users';
            const response = await httpRequest.sendRequest({
                url: url,
                method: 'get'
            });

            expect(response).has.to.be.string;
        });
    });
});