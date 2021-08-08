import React from "react";
import { TextField } from "../../components/Form";
import Container from "../../components/container";
import Toolbar from "../../components/Toolbar";
import { Button, Modal, Table, Space } from "antd";
import DriverAPI from "../../api/DriverAPI";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import swal from "sweetalert";

const schema = yup.object().shape({
	code: yup.string().required(),
	name: yup.string().required(),
	phone_number: yup.string().required(),
});

const ListDriver = (props) => {
	const [isModalVisible, setIsModalVisible] = React.useState(false);
	const [dataSource, setDataSource] = React.useState([]);
	const [detailId, setDetailId] = React.useState(null);
	const [initialValues, setInitialValues] = React.useState({
		code: "",
		name: "",
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
			code: values.code,
			name: values.name,
			phone_number: values.phone_number,
		};
		let fetch;
		if (detailId !== null) {
			fetch = DriverAPI.update(detailId, payload);
		} else {
			fetch = DriverAPI.create(payload);
		}
		fetch
			.then((res) => {
				setIsModalVisible(false);
				swal("Message", "Successfully processed", "success");
				reset({});
				retrieveDriver();
			})
			.catch((err) => {
				console.log("err", err);
			});
	};

	const onDelete = (id) => {
		DriverAPI.delete(id)
			.then((res) => {
				retrieveDriver();
				swal("Message", "successfully deleted", "success");
			})
			.catch((err) => {
				console.log("err", err);
			});
	};

	const retrieveDriver = () => {
		DriverAPI.getList()
			.then((res) => {
				setDataSource(res.data.data);
			})
			.catch((err) => {
				console.log("err", err);
			});
	};

	React.useEffect(() => {
		retrieveDriver();
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
					Add Courier
				</Button>
			</>
		);
	};

	const columns = [
		{
			title: "Code",
			dataIndex: "code",
			key: "code",
		},
		{
			title: "Name",
			dataIndex: "name",
			key: "name",
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
				<Toolbar title={"Couriers"} customActions={toolbarActions} />
				<Table columns={columns} dataSource={dataSource} />
				{isModalVisible && (
					<Modal
						title="Courier"
						visible={isModalVisible}
						footer={null}
						onCancel={handleClose}
					>
						<form onSubmit={handleSubmit(handleActionSubmit)}>
							<div style={{ marginBottom: "14px" }}>
								<TextField
									name="code"
									control={control}
									label="Code"
									errormessage={errors.code?.message}
								/>
							</div>
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
									name="phone_number"
									control={control}
									label="Phone Number"
									errormessage={errors.phone_number?.message}
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

export default ListDriver;
