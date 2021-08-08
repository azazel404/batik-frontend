import axios from "axios";

const baseURL = `${process.env.REACT_APP_URLAPI}`;

const post = async (url, options = { method: "GET", body: {} }) => {
	const request = {
		method: options.method,
		baseURL,
		url,
		headers: {
			"Content-Type": "application/json",
		},
	};
	if (request.method === "POST" || request.method === "PUT") {
		request.data = options.body;
	}
	try {
		const res = await axios(request);

		if (res.status >= 200 && res.status < 400) {
			return res;
		}
	} catch (error) {
		throw error;
	}
};

const AuthAPI = {
	Login: (body) => {
		const payload = {
			method: "POST",
			body: body,
		};
		return post(`/login`, payload);
	},
};

export default AuthAPI;
