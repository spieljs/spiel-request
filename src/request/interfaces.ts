export type Keys = string;

export type Headers = {[key in Keys]: string};

export interface RequestConfig {
    /**It set the headers request by default
    * @see <a href="https://developer.mozilla.org/en-US/docs/Web/API/Headers" target="_blank">Headers</a>
    * @default 'Content-Type': 'application/json; charset=utf-8'
    */
    headers?: Headers;
    /** 
    * It set to use or not credentials in a cross-site by default
    * @see <a href="https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/withCredentials" target="_blank">Credentials</a>
    * @default false 
    */
    credentials?: boolean;
    /**
    * It adds the domain to all the requests
    */
    domain?: string;
    /**
    * Type of response expected by default
    * @see <a href="https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/responseType" target="_blank">Response Type</a>
    * @default json 
    */
    responseType?: XMLHttpRequestResponseType;
}

export interface RequestOptions {
    /** It sets the http request method
    * @see <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods" target="_blank">Response Type</a>  
    */
    method: string;
    /** 
    * Request url
    * @example options = { method: "get", url:"/user"} or options = { method: "get", url:"http://example.com/user"}
    */
    url: string;
    /** 
    * It set te headers for this request
    * @see <a href="https://developer.mozilla.org/en-US/docs/Web/API/Headers" target="_blank">Headers</a> 
    */
    headers?: Headers;
    /** 
    * If you want that the request send in json format.
    * @default true 
    */
    requestJson?: Boolean;
    /** 
    * Type of response expected for this request
    * @see <a href="https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/responseType" target="_blank">Response Type</a>
    */
    responseType?: XMLHttpRequestResponseType;
    /**
    * It sets the body which will be sended with the request
    * @see <a href="https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/send" target="_blank">Body</a> 
    */
    body?: any;
}

export interface RequestFileOptions {
    /** 
    * Request url
    * @example options = { method: "get", url:"/user"} or options = { method: "get", url:"http://example.com/user"}
    */
    url: string;
    /**
    * Alias name of the file to upload
    */
    name: string;
    /**
    * File to upload 
    */
    file: any;
    /** 
    * Type of response expected for this request
    * @see <a href="https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/responseType" target="_blank">Response Type</a>
    */
    responseType?: XMLHttpRequestResponseType;
}