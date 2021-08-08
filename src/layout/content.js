import React from "react";

import { Layout } from "antd";
import "./styles.css";
const { Content } = Layout;

const AntContent = (props) => {
	return (
		<>
			<Content style={{ padding: "16px" }}>{props.children}</Content>
		</>
	);
};

export default AntContent;
