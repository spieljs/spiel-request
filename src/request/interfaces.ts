export type Keys = string;

export type Headers = {[key in Keys]: string};

export interface RequestConfig {
    headers?: Headers;
    credentials?: boolean;
    domain?: string;
    responseType?: XMLHttpRequestResponseType;
}

export interface RequestOptions {
    method: string;
    url: string;
    headers?: Headers;
    requestJson?: Boolean;
    responseType?: XMLHttpRequestResponseType;
    body?: any;
}

export interface RequestFileOptions {
    url: string;
    name: string;
    file: any;
    responseType?: XMLHttpRequestResponseType;
}