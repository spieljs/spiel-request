export type Keys = string;

export type Headers = {[key in Keys]: string};

/** 
* @see <a href='https://github.com/spiel-framework/spiel-request#set-the-request-options-by-default' target="_blank">Set the request options by default</a> 
*/
export interface RequestConfig {
    /**It set the headers request by default
    * @see <a href="https://developer.mozilla.org/en-US/docs/Web/API/Headers" target="_blank">Headers</a>
    * @default 'Content-Type': 'application/json; charset=utf-8'
    */
    headers?: Headers;
    /** 
    * It sets to use or not credentials in a cross-site by default
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

/** 
* @see <a href='https://github.com/spiel-framework/spiel-request#send-your-requests' target="_blank">Send your requests</a> 
*/
export interface RequestOptions {
    /** It sets the http request method
    * @see <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods" target="_blank">Methods</a>  
    */
    method: string;
    /** 
    * Request url
    * @example options = { method: "get", url:"/user"} or options = { method: "get", url:"http://example.com/user"}
    */
    url: string;
    /** 
    * It sets te headers for this request
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

/** 
* @see <a href='https://github.com/spiel-framework/spiel-request#upload-your-files' target="_blank">Upload your files</a> 
*/
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