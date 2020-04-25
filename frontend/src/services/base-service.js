class BaseService {
    constructor() {
        this.apiRootPath = "http://localhost:3001/";
    }

    apiGet(options) {
        options.method = 'GET';
        return this._makeRequest(options);
    }

    apiPost(options) {
        options.method = 'POST';
        return this._makeRequest(options);
    }

    apiPut(options) {
        options.method = 'PUT';
        return this._makeRequest(options);
    }

    async _makeRequest(options) {
        const { body, headers, path, method } = options;
        const url = this.apiRootPath + path;
        let request = {
            method: method || 'GET',
            headers: headers,
            body: body,
            mode: 'cors'
        };



        //Add Headers
        //Add header
        if (!headers)
            options.headers = [];
        options.headers.push({ 'Content-Type': 'application/json; charset=utf-8' });
        request.headers = new Headers();

        if (options.headers && options.headers.length) {
            options.headers.forEach(function (header) {
                let label = Object.getOwnPropertyNames(header)[0];
                request.headers.append(label, header[label]);
            });
        }

        //Stringify body
        if (typeof request.body === 'object')
            request.body = JSON.stringify(request.body);

        try {
            const response = await fetch(url, request);
            return response.json();
        } catch (error) {
            console.log("failed_to_fetch:", error);
        }
    }
}

export default BaseService;