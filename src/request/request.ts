import {Headers, RequestOptions, RequestConfig} from './interfaces';
 
export class HttpRequest {
    private headers: Headers;
    private request: XMLHttpRequest;
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

    addEventListener(event: string, action: (event: any) => any){
        this.request.addEventListener(event, action);
    }

    setHeaders(headers: Headers) {
        this.buildHeaders(headers);
    }

    open(method: string, url: string, async: boolean) {
        this.request.open(method, url, async);
    }

    responseType(type: XMLHttpRequestResponseType) {
        this.request.responseType = type;
    }

    onProgress(onProgressHandler: (this: XMLHttpRequest, event: ProgressEvent)=> any): Function {
        return this.request.onprogress = onProgressHandler;
    }

    onLoad(onLoadHandler: (event: any) => any ): Function {
        return this.request.onload = onLoadHandler;
    }

    onLoadStart(onLoadStartHandle: (this: XMLHttpRequest, event: Event)=> any): Function {
        return this.request.onloadstart = onLoadStartHandle;
    }

    onLoadEnd(onLoadEndHandler: (this: XMLHttpRequest, event: ProgressEvent)=> any): Function {
        return this.request.onloadend = onLoadEndHandler;
    }

    onReadyStateChange(onReadyStateChangeHandeler: (this: XMLHttpRequest, event: Event) => any): Function {
        return this.request.onreadystatechange = onReadyStateChangeHandeler;
    }

    onTimeout(onTimeoutHandler: (this: XMLHttpRequest, event: ProgressEvent) => any): Function {
        return this.request.ontimeout = onTimeoutHandler;
    }

    send(body?: Document) {
        this.request.send(body);
    }

    sendRequest(options: RequestOptions) {
        return Promise.resolve(this.buildRequest(options))
            .then(response => response)
            .catch(error => error);
    }

    private buildRequest(options: RequestOptions) {
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

            this.request.responseType = (options.typeResponse) ?
            options.typeResponse : 'json';
            
            this.request.send(options.body);
        });
    }

    private buildHeaders(headers: Headers) {
        Object.keys(headers).forEach(key => {
            this.request.setRequestHeader(key, this.headers[key]);
        });
    }
}

export const httpRequest = new HttpRequest();
