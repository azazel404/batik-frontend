import { _fetch } from "../helpers/_fetch";

const DriverAPI = {
	getList: () => {
		const request = {
			method: "GET",
			body: {},
		};
		return _fetch(`/admin/driver/list`, request);
	},
	create: (body) => {
		const request = {
			method: "POST",
			body: body,
		};
		return _fetch(`/admin/driver/create`, request);
	},
	update: (id, body) => {
		const request = {
			method: "PUT",
			body: body,
		};
		return _fetch(`/admin/driver/update/${id}`, request);
	},
	delete: (id) => {
		const request = {
			method: "DELETE",
			body: {},
		};
		return _fetch(`/admin/driver/delete/${id}`, request);
	},
};

export default DriverAPI;
