import React from "react";
import { Layout } from "antd";
import "./styles.css";
const { Sider } = Layout;

const AntSidebar = (props) => {
	const { collapsed, children, companyLogo } = props;

	return (
		<>
			<Sider
				width={"260"}
				trigger={null}
				collapsible
				collapsed={collapsed}
				theme="light"
				style={{
					boxShadow: "2px 0 8px 0 rgb(29 35 41 / 5%)",
				}}
			>
				<div className="company-logo" />
				{children}
			</Sider>
		</>
	);
};

export default AntSidebar;
