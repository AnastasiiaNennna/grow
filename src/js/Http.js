class Http {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._apiKey = options.apiKey;
        this._list = [];
    }

    request(uri, query, method, data) {
        return fetch(this._baseUrl + uri + this._apiKey + query, {
            method,
            body: data ? JSON.stringify(data) : null,
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((res) => res.json())
            .then((data) => this.setData(data));
    }

    setData(data) {
        this._list = data.results;
        return this._list;
    }

    get(query='', uri='') {
        return this.request(uri, query, 'GET');
    }

    list() {
        return this.get();
    }

    filterList(query='') {
        return this.get(query);
    }
}
