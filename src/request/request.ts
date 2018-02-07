import {Headers, RequestOptions, RequestConfig, RequestFileOptions} from './interfaces';
import { json } from 'body-parser';

/**
* HttpRequest class sets the ajax requests.
* It uses XMLHttpRequest
* @see <a href="https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest" target="_blank">XMLHttpRequest</a>
* @preferred
*/
export class HttpRequest {
    private headers!: Headers;
    /**
    * It includes the XMLHttpRequest singleton which is possible
    * to access whole its methods
    * @see <a href="https://github.com/spiel-framework/spiel-request#use-the-xmlhttprequest-methods" target="_blank">Use the XmlHttpRequest methods</a>
    */
    request!: XMLHttpRequest;
    private domain!: string;
    private defaulResponseType!: XMLHttpRequestResponseType;
    private credentials!: boolean;

    /**
    * It sets the default ajax request
    * @param options default request options
    */
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

    /** 
    * It interrupts a progress request
    */
    abort() {
        this.request.abort();
    }

    /**
    * It sets headers 
    * @param headers 
    */
    setHeaders(headers: Headers) {
        this.buildHeaders(headers);
    }
    
    /**
    * It sends ajax request
    * @param options specific options for this request
    */
    sendRequest(options: RequestOptions) {
        return new Promise((resolve, reject) => {

            const url = (this.domain && !this.hasDomain(options.url)) 
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

    /**
    * It uploads file
    * @param options upload options
    * @see <a href="https://developer.mozilla.org/en-US/docs/Web/API/FormData#Browser_compatibility" target="_blank">Browser compatibility</a>
    */
    uploadFile(options: RequestFileOptions) {
        return new Promise((resolve, reject) => {
            const url = (this.domain && !this.hasDomain(options.url)) 
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

    private hasDomain(url: string): Array<string> | null {
        return url.match(/http:\/\/|https:\/\//g)
    }
}

export const httpRequest = new HttpRequest();
