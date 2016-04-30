export const serialize = (obj) =>
	Object.keys(obj)
		.map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
		.join('&');

export const checkStatus = (response) => {
	if (response.status >= 200 && response.status < 300) {
		return response;
	}
	const error = new Error(response.statusText);
	error.response = response;
	throw error;
};

export const parseJSON = (response) => response.json();
