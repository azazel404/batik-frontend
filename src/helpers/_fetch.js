import axios from "axios";

const baseURL = `${process.env.REACT_APP_URLAPI}`;

const getAuth = () => {
	let accessToken = localStorage.getItem("token_login");

	return `${accessToken}`;
};

export const _fetch = async (
	url,
	options = {
		method: "GET",
		body: {},
	}
) => {
	const authorization = getAuth();

	const request = {
		method: options.method,
		baseURL,
		url,
		headers: {
			"x-access-token": authorization,
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
		} else {
			localStorage.removeItem("token_login");
			window.location.reload();
		}
	} catch (error) {
		throw error;
	}
};
