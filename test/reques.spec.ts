import { httpRequest } from '../src';
import { expect } from 'chai';

describe('Request', () => {
    describe('Default request config', () => {
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

        it('has to recibe one user', async() => {
            let url = 'http://localhost:3000/users/3';
            const response = await httpRequest.sendRequest({
                url: url,
                method: 'get'
            });

            expect(response.name).has.to.be.equal('Narges');
        });

        it('has to handler the error', async() => {
            let url = 'http://localhost:3000/users/6';
            
            const response = await httpRequest.sendRequest({
                url: url,
                method: 'get'
            });

            expect(response).has.to.be.equal('404. Not Found');
        });
        
    })
})