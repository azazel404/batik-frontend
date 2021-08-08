import React from "react";
import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import Container from "../../components/container";
import "./style.css";
import AuthAPI from "../../api/AuthAPI";
import { withRouter } from "react-router-dom";

const Login = (props) => {
	const onFinish = (values) => {
		let body = {
			email: values.email,
			password: values.password,
		};
		AuthAPI.Login(body)
			.then((res) => {
				localStorage.setItem("token_login", res.data.data.token);
				localStorage.setItem("role_batik", res.data.data.isAdmin);
				props.history.push("/order");
			})
			.catch((err) => {
				console.log("err", err);
			});
	};

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "row",
				justifyContent: "center",
				alignItems: "center",
				height: "100vh",
				backgroundColor: "#F0F2F5",
			}}
		>
			<div style={{ width: "400px", height: "400px" }}>
				<Container>
					<Form
						name="normal_login"
						initialValues={{
							remember: true,
						}}
						onFinish={onFinish}
					>
						<Form.Item
							name="email"
							rules={[
								{
									required: true,
									message: "Please input your Email!",
								},
							]}
						>
							<Input
								prefix={<UserOutlined className="site-form-item-icon" />}
								placeholder="Email"
							/>
						</Form.Item>
						<Form.Item
							name="password"
							rules={[
								{
									required: true,
									message: "Please input your Password!",
								},
							]}
						>
							<Input
								prefix={<LockOutlined className="site-form-item-icon" />}
								type="password"
								placeholder="Password"
							/>
						</Form.Item>
						<Form.Item>
							<Button type="primary" htmlType="submit" className="login-form-button">
								Log in
							</Button>
						</Form.Item>
					</Form>
				</Container>
			</div>
		</div>
	);
};

export default withRouter(Login);
