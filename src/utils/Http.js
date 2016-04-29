function serialize(obj) {
	return Object.keys(obj).map((key) =>
		`${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`
	).join('&');
}

class http {
	constructor(url) {
		this.url = url;
	}

	ajax(method, url, args) {
		// Creating a promise
		return new Promise((resolve, reject) => {
			const client = new XMLHttpRequest();
			let uri = url;

			if (args) {
				uri += `?${serialize(args)}`;
			}

			client.open(method, uri);
			client.send();

			client.addEventListener('load', (event) => {
				if (event.currentTarget.status === 200) {
					resolve(event.currentTarget.response);
				} else {
					reject(event.currentTarget.statusText);
				}
			});

			client.addEventListener('error', (event) => {
				reject(event.currentTarget.statusText);
			});
		});
	}

	get(args) {
		return this.ajax('GET', this.url, args);
	}

	post(args) {
		return this.ajax('POST', this.url, args);
	}

	put(args) {
		return this.ajax('PUT', this.url, args);
	}

	delete(args) {
		return this.ajax('DELETE', this.url, args);
	}
}

export default http;
