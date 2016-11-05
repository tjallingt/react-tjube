export const URIEncodeValues = (strings, ...values) => (
	strings.reduce((previous, current, index) =>
		previous + encodeURIComponent(values[index - 1]) + current
	)
);

export const serialize = obj => (
	Object.keys(obj)
		.map(key => URIEncodeValues`${key}=${obj[key]}`)
		.join('&')
);

export const checkStatus = (response) => {
	if (response.status >= 200 && response.status < 300) {
		return response;
	}
	const error = new Error(response.statusText);
	error.response = response;
	throw error;
};

export const parseJSON = response => response.json();
