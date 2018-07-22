export const URIEncodeValues = (strings, ...values) => (
	strings.reduce(
		(previous, current, index) => previous + encodeURIComponent(values[index - 1]) + current
	)
);

export const serialize = obj => (
	Object.entries(obj)
		.map(([key, value]) => URIEncodeValues`${key}=${value}`)
		.join('&')
);

export const checkStatus = (response) => {
	if (response.ok) {
		return response;
	}
	throw Error(response.statusText);
};

export const checkYTResponse = (json) => {
	if (json.error) {
		throw Error(json.error.message);
	}
	return json;
};

export const parseJSON = response => response.json();
