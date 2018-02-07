# Spiel Request

Spiel request is a module to send ajax request. It use [XmlHttpRequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest)

## How use it

### Set the request options by default

```typescript
import {httpRequest, RequestConfig, RequestOptions, Headers} from 'spiel-request'

const headers: Headers  = {
    'Accept': 'application/json, text/*'
} 
const options: RequestConfig = {
    responseType: 'text',
    headers,
    credentials: true,
    domain: 'http://localhost:3000'
}
```

### Send your requests

```typescript
const url = 'http://localhost:3000/users';
const response = httpRequest.sendRequest({
    url,
    method: 'get'
});
```

### Upload your files

```typescript
const url = 'http://localhost:3000/upload';

const blob = new Blob(['abc123'], {type: 'text/plain'});

const file = httpRequest.uploadFile({
    url,
    file: blob,
    responseType: 'json',
    name: 'test'
});
```

### Use the XmlHttpRequest methods

```typescript
const oReq = httpRequest.request

oReq.addEventListener("progress", updateProgress);
oReq.addEventListener("load", transferComplete);
oReq.addEventListener("error", transferFailed);
oReq.addEventListener("abort", transferCanceled);

oReq.open();
```

### Run Spiel Request tests

Open two terminals, in the first execute `npm run service` and the another `npm test`

### License

Spiel Request is MIT licensed. See [license](LICENSE)