import { _fetch } from "../helpers/_fetch";

const OrderAPI = {
	getList: () => {
		const request = {
			method: "GET",
			body: {},
		};
		return _fetch(`/admin/order/list`, request);
	},
	// create: (body) => {
	// 	const request = {
	// 		method: "POST",
	// 		body: body,
	// 	};
	// 	return _fetch(`/admin/order/create`, request);
	// },
	update: (id, body) => {
		const request = {
			method: "PUT",
			body: body,
		};
		return _fetch(`/admin/order/update/${id}`, request);
	},
	cancelOrder: (id, body) => {
		const request = {
			method: "POST",
			body: body,
		};
		return _fetch(`/admin/order/Close-order/${id}`, request);
	},
};

export default OrderAPI;
