import React from "react";
import { Layout, Button, PageHeader } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined, LogoutOutlined } from "@ant-design/icons";
import "./styles.css";
const { Header } = Layout;

const AntHeader = (props) => {
	const { renderActions } = props;
	return (
		<>
			<Header className="site-layout-background" style={{ padding: 0 }}>
				<div
					style={{
						display: "flex",
						height: "100%",
						justifyContent: "space-between",
						padding: "16px",
						alignItems: "center",
					}}
				>
					{React.createElement(props.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
						className: "trigger",
						onClick: props.toggle,
					})}{" "}
					{renderActions()}
				</div>
			</Header>
		</>
	);
};

export default AntHeader;
