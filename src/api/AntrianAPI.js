import { _fetch } from "../helpers/_fetch";

const AntrianAPI = {
	getList: () => {
		const request = {
			method: "GET",
			body: {},
		};
		return _fetch(`/admin/antrian/list`, request);
	},
	
	update: (id, body) => {
		const request = {
			method: "PUT",
			body: body,
		};
		return _fetch(`/admin/antrian/update/${id}`, request);
	},
	
};

export default AntrianAPI;
