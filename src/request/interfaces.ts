export type Keys = string;

export type Headers = {[key in Keys]: string};

export interface RequestOptions {
    method: string;
    url: string;
    headers?: Headers;
    typeResponse?: XMLHttpRequestResponseType;
    body?: any;
}

export interface RequestConfig {
    headers?: Headers;
    credentials?: boolean;
    domain?: string;
    responseType?: XMLHttpRequestResponseType;
}