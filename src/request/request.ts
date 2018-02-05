import {Headers, RequestOptions, RequestConfig, RequestFileOptions} from './interfaces';
import { json } from 'body-parser';
 
export class HttpRequest {
    private headers: Headers;
    request: XMLHttpRequest;
    private domain: string;
    private defaulResponseType: XMLHttpRequestResponseType;
    private credentials: boolean;

    setRequest(options?: RequestConfig) {
        this.headers = (options && options.headers) ? 
            options.headers : {'Content-Type': 'application/json; charset=utf-8'};

        if (options && options.domain) this.domain = options.domain;

        this.defaulResponseType = (options && options.responseType) ? 
            options.responseType : 'json';

        this.request = new XMLHttpRequest();

        this.credentials = (options && options.credentials) 
            ? options.credentials : false;

        return this;
    }

    abort() {
        this.request.abort();
    }

    setHeaders(headers: Headers) {
        this.buildHeaders(headers);
    }

    sendRequest(options: RequestOptions) {
        return new Promise((resolve, reject) => {

            const url = (this.domain) 
            ? `${this.domain}${options.url}` : options.url;

            this.request.onload = (event: any) => {
                if(this.request.readyState === 4 &&
                        event.target.status >= 200 && event.target.status < 400) {
                    resolve(event.target.response);
                } else {
                    const error = `${event.target.status}. ${event.target.statusText}`;
                    reject(error); 
                }
            }

            this.request.onerror = () => {
                const error = `Error to send the request to ${url}. ${this.request.statusText}`;
                reject(error);
            }

            this.request.open(options.method, url, true);
            this.buildHeaders(options.headers || this.headers);
            this.request.withCredentials = this.credentials;

            this.request.responseType = (options.responseType) ?
            options.responseType : 'json';

            const requestJson = (options.requestJson !== undefined) 
                ? options.requestJson : true;

            if(requestJson) {
                this.request.send(JSON.stringify(options.body));
            } else {
                this.request.send(options.body);
            }
        });
    }

    uploadFile(options: RequestFileOptions) {
        return new Promise((resolve, reject) => {
            const url = (this.domain) 
            ? `${this.domain}${options.url}` : options.url;

            this.request.onload = (event: any) => {
                if(this.request.readyState === 4 &&
                        event.target.status >= 200 && event.target.status < 400) {
                    resolve(event.target.response);
                } else {
                    const error = `${event.target.status}. ${event.target.statusText}`;
                    reject(error); 
                }
            }

            this.request.onerror = () => {
                const error = `Error to send the request to ${url}. ${this.request.statusText}`;
                reject(error);
            }

            this.request.open('post', url, true);
            this.request.withCredentials = this.credentials;

            this.request.responseType = (options.responseType) ?
            options.responseType : 'text';

            const formData = new FormData();
            formData.append(options.name, options.file);
            
            this.request.send(formData);
        });
    }

    private buildHeaders(headers: Headers) {
        Object.keys(headers).forEach(key => {
            this.request.setRequestHeader(key, this.headers[key]);
        });
    }
}

export const httpRequest = new HttpRequest();
