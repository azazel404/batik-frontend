import React from "react";
import {
	HomeFilled,
	ContactsFilled,
	UserOutlined,
	ScheduleOutlined,
	FileOutlined,
	CheckOutlined,
	QuestionOutlined,
	UsergroupAddOutlined,
	CalendarOutlined,
	BankOutlined,
	MessageOutlined,
	WalletOutlined,
} from "@ant-design/icons";

const items = [
	{
		label: "Orders",
		icon: <ScheduleOutlined />,
		link: "/order",
	},
	{
		label: "Product",
		icon: <ScheduleOutlined />,
		link: "/product",
	},
	{
		label: "Category Product",
		icon: <ScheduleOutlined />,
		link: "/category-product",
	},
	{
		label: "Courir",
		icon: <ScheduleOutlined />,
		link: "/courir",
	},
	{
		label: "Users",
		icon: <ScheduleOutlined />,
		link: "/users",
	},
];

export { items };
