import { _fetch } from "../helpers/_fetch";

const CategoryAPI = {
	getList: () => {
		const request = {
			method: "GET",
			body: {},
		};
		return _fetch(`/admin/category/list`, request);
	},
	create: (body) => {
		const request = {
			method: "POST",
			body: body,
		};
		return _fetch(`/admin/category/create`, request);
	},
	update: (id, body) => {
		const request = {
			method: "PUT",
			body: body,
		};
		return _fetch(`/admin/category/update/${id}`, request);
	},
	delete: (id) => {
		const request = {
			method: "DELETE",
			body: {},
		};
		return _fetch(`/admin/category/delete/${id}`, request);
	},
};

export default CategoryAPI;
