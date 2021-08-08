import React, { Suspense, useState } from "react";
import { Switch, Redirect, Route } from "react-router-dom";
import Sidebar from "./sidebar";
import Header from "./header";
import NavigationOptions from "./navigation";
import Content from "./content";
import Separator from "../components/separator";
import { Layout, Button } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { items } from "./constant";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";

import Product from "../screens/product";
import CategoryProduct from "../screens/categoryProduct";
import User from "../screens/user";
import Driver from "../screens/driver";
import Order from "../screens/order";

import "antd/dist/antd.css";

const MainLayout = (props) => {
	const { history, location } = props;
	const [collapsed, setCollapsed] = useState(false);

	const toggleSidebar = () => {
		setCollapsed(!collapsed);
	};

	const renderActions = () => {
		return (
			<>
				<div
					style={{
						display: "flex",
						flexDirection: "row",
						alignItems: "center",
					}}
				>
					<div
						style={{
							display: "flex",
							flexDirection: "row",
							alignItems: "center",
							justifyContent: "center",
						}}
					>
						<Avatar icon={<UserOutlined />} />
						<Separator variant="horizontal" size="6" />
						Admin
					</div>
					<Separator variant="horizontal" size="24" />
					<Button
						type="primary"
						icon={<LogoutOutlined />}
						style={{ borderRadius: "6px" }}
						onClick={() => {
							localStorage.removeItem("token_login");
							window.location.reload();
						}}
					>
						Logout
					</Button>
				</div>
			</>
		);
	};

	const isRoot = location.pathname === "/";
	if (isRoot) return <Redirect to={"/order"} />;

	return (
		<Layout style={{ minHeight: "100vh" }}>
			<Sidebar collapsed={collapsed}>
				<NavigationOptions items={items} />
			</Sidebar>
			<Layout className="site-layout">
				<Header
					toggle={toggleSidebar}
					collapsed={collapsed}
					renderActions={renderActions}
				/>
				<Content>
					<Switch>
						<Route path={`/product`} exact component={Product} />
						<Route path={`/category-product`} exact component={CategoryProduct} />
						<Route path={`/courir`} exact component={Driver} />
						<Route path={`/users`} exact component={User} />
						<Route path={`/order`} exact component={Order} />
					</Switch>
				</Content>
			</Layout>
		</Layout>
	);
};

export default MainLayout;
