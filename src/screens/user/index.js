import React from "react";
import { TextField } from "../../components/Form";
import Container from "../../components/container";
import Toolbar from "../../components/Toolbar";
import { Button, Modal, Table, Space } from "antd";
import UserAPI from "../../api/UserAPI";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import swal from "sweetalert";

const schema = yup.object().shape({
	name: yup.string().required(),
	email: yup.string().required(),
	password: yup.string().required(),
	address: yup.string().required(),
	phone_number: yup.string().required(),
});

const ListUser = (props) => {
	const [isModalVisible, setIsModalVisible] = React.useState(false);
	const [dataSource, setDataSource] = React.useState([]);
	const [detailId, setDetailId] = React.useState(null);
	const [initialValues, setInitialValues] = React.useState({
		name: "",
		password: "",
		address: "",
		email: "",
		phone_number: "",
	});

	const { register, handleSubmit, control, errors, reset } = useForm({
		resolver: yupResolver(schema),
		defaultValues: initialValues,
	});

	const showModal = () => {
		setIsModalVisible(true);
	};

	const handleActionSubmit = (values) => {
		const payload = {
			name: values.name,
			password: values.password,
			address: values.address,
			email: values.email,
			phone_number: values.phone_number,
		};
		let fetch;
		if (detailId !== null) {
			fetch = UserAPI.update(detailId, payload);
		} else {
			fetch = UserAPI.create(payload);
		}
		fetch
			.then((res) => {
				setIsModalVisible(false);
				swal("Message", "Successfully processed", "success");
				reset({});
				retrieveDataUser();
			})
			.catch((err) => {
				console.log("err", err);
			});
	};

	const onDelete = (id) => {
		UserAPI.delete(id)
			.then((res) => {
				retrieveDataUser();
				swal("Message", "successfully deleted", "success");
			})
			.catch((err) => {
				console.log("err", err);
			});
	};

	const retrieveDataUser = () => {
		UserAPI.getList()
			.then((res) => {
				let result = res.data.data.filter((item) => item.isAdmin !== true);
				setDataSource(result);
			})
			.catch((err) => {
				console.log("err", err);
			});
	};

	React.useEffect(() => {
		retrieveDataUser();
	}, []);

	const handleClose = () => {
		setIsModalVisible(false);
		reset({});
	};

	const toolbarActions = () => {
		return (
			<>
				<Button
					type="primary"
					onClick={() => {
						setDetailId(null);
						showModal();
					}}
				>
					Add User
				</Button>
			</>
		);
	};

	const columns = [
		{
			title: "Name",
			dataIndex: "name",
			key: "name",
		},
		{
			title: "Email",
			dataIndex: "email",
			key: "email",
		},
		{
			title: "Address",
			dataIndex: "address",
			key: "address",
		},
		{
			title: "Phone Number",
			dataIndex: "phone_number",
			key: "phone_number",
		},
		{
			title: "Action",
			key: "action",
			render: (text, record) => (
				<Space size="middle">
					<a
						onClick={() => {
							setDetailId(record.id);
							setInitialValues(record);
							reset(record);
							setIsModalVisible(true);
						}}
					>
						Edit
					</a>
					<a onClick={() => onDelete(record.id)}>Delete</a>
				</Space>
			),
		},
	];
	return (
		<>
			<Container>
				{" "}
				<Toolbar title={"List User"} customActions={toolbarActions} />
				<Table columns={columns} dataSource={dataSource} />
				{isModalVisible && (
					<Modal
						title="User"
						visible={isModalVisible}
						footer={null}
						onCancel={handleClose}
					>
						<form onSubmit={handleSubmit(handleActionSubmit)}>
							<div style={{ marginBottom: "14px" }}>
								<TextField
									name="name"
									control={control}
									label="Name"
									errormessage={errors.name?.message}
								/>
							</div>
							<div style={{ marginBottom: "14px" }}>
								<TextField
									name="email"
									control={control}
									label="Email"
									errormessage={errors.email?.message}
								/>
							</div>
							<div style={{ marginBottom: "14px" }}>
								<TextField
									name="phone_number"
									control={control}
									label="Phone Number"
									errormessage={errors.phone_number?.message}
								/>
							</div>
							<div style={{ marginBottom: "14px" }}>
								<TextField
									name="address"
									control={control}
									label="Address"
									errormessage={errors.address?.message}
								/>
							</div>
							<div style={{ marginBottom: "14px" }}>
								<TextField
									name="password"
									control={control}
									label="Password"
									type="password"
									errormessage={errors.password?.message}
								/>
							</div>
							<div
								style={{
									display: "flex",
									flexDirection: "row",
									justifyContent: "space-between",
									paddingTop: "24px",
								}}
							>
								<Button key="back" onClick={handleClose}>
									Close
								</Button>
								<Button htmlType="submit" key="submit" type="primary">
									Submit
								</Button>
							</div>
						</form>
					</Modal>
				)}
			</Container>
		</>
	);
};

export default ListUser;
