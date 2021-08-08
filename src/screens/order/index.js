import React from "react";
import { TextField, SelectField, InputPicker } from "../../components/Form";
import Container from "../../components/container";
import Toolbar from "../../components/Toolbar";
import { Button, Modal, Table, Space, Row, Col } from "antd";
import OrderAPI from "../../api/OrderAPI";
import DriverAPI from "../../api/DriverAPI";
import UserAPI from "../../api/UserAPI";
import ProductAPI from "../../api/ProductAPI";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import swal from "sweetalert";
import moment from "moment";
import { StatusOrder } from "../../helpers/statusOrder";

// const schema = yup.object().shape({
// 	code: yup.string().required(),
// 	name: yup.string().required(),
// });

const ListOrder = (props) => {
	const [isModalVisible, setIsModalVisible] = React.useState(false);
	const [dataSource, setDataSource] = React.useState([]);
	const [dataDriver, setDataDriver] = React.useState([]);
	const [dataProduct, setDataProduct] = React.useState([]);
	const [dataUser, setDataUser] = React.useState([]);
	const [detailId, setDetailId] = React.useState(null);
	const [initialValues, setInitialValues] = React.useState({
		code: "",
		product_id: "",
		users_id: "",
		driver_id: "",
		start_date: "",
		end_date: "",
		trans_date: "",
		qty: "",
		// document : "",
		status: "",
	});

	const { register, handleSubmit, control, errors, reset } = useForm({
		//resolver: yupResolver(schema),
		defaultValues: initialValues,
	});

	const showModal = () => {
		setIsModalVisible(true);
	};

	const handleActionSubmit = (values) => {
		let payload = {
			status: 1,
			driver_id: values.driver_id,
		};

		OrderAPI.update(detailId, payload)
			.then((res) => {
				setIsModalVisible(false);
				swal("Message", "Successfully processed", "success");
				reset({});
				retrieveOrder();
			})
			.catch((err) => {
				console.log("err", err);
			});
	};

	const CancelOrder = (id) => {
		let payload = {
			status: 3,
		};
		OrderAPI.cancelOrder(id, payload)
			.then((res) => {
				retrieveOrder();
				swal("Message", "successfully rejected", "success");
			})
			.catch((err) => {
				console.log("err", err);
			});
	};

	const retrieveOrder = () => {
		OrderAPI.getList()
			.then((res) => {
				setDataSource(res.data.data);
			})
			.catch((err) => {
				console.log("err", err);
			});
	};

	const retrieveDataDrive = () => {
		DriverAPI.getList()
			.then((res) => {
				let result = res.data.data.map((item) => {
					return {
						label: item.name,
						value: item.id,
					};
				});
				setDataDriver(result);
			})
			.catch((err) => {
				console.log("err", err);
			});
	};

	const retrieveDataProduct = () => {
		ProductAPI.getList()
			.then((res) => {
				let result = res.data.data.map((item) => {
					return {
						label: item.name,
						value: item.id,
					};
				});
				setDataProduct(result);
			})
			.catch((err) => {
				console.log("err", err);
			});
	};

	const retrieveDataUser = () => {
		UserAPI.getList()
			.then((res) => {
				let result = res.data.data.map((item) => {
					return {
						label: item.name,
						value: item.id,
					};
				});
				setDataUser(result);
			})
			.catch((err) => {
				console.log("err", err);
			});
	};

	React.useEffect(() => {
		retrieveOrder();
		retrieveDataDrive();
		retrieveDataProduct();
		retrieveDataUser();
	}, []);

	const handleClose = () => {
		setIsModalVisible(false);
		reset({});
	};

	const columns = [
		{
			title: "Code",
			dataIndex: "code",
			key: "code",
		},
		{
			title: "Product",
			dataIndex: "product",
			key: "product",
			render: (text, record) => <span>{record && record.products.name}</span>,
		},
		{
			title: "User",
			dataIndex: "user",
			key: "user",
			render: (text, record) => <span>{record && record.users.name}</span>,
		},
		{
			title: "Start Date",
			dataIndex: "start_date",
			key: "start_date",
			render: (text, record) => (
				<span>{moment(record.start_date).format("dddd MMMM YYYY ")}</span>
			),
		},
		{
			title: "End Date",
			dataIndex: "end_date",
			key: "end_date",
			render: (text, record) => (
				<span>{moment(record.end_date).format("dddd MMMM YYYY ")}</span>
			),
		},
		{
			title: "Qty",
			dataIndex: "qty",
			key: "qty",
		},
		{
			title: "Status",
			dataIndex: "status",
			key: "status",
			render: (text, record) => {
				let result = StatusOrder.find((item) => item.value === parseInt(record.status));
				return <span>{result && result.label}</span>;
			},
		},
		{
			title: "Action",
			key: "action",
			render: (text, record) => (
				<Space size="middle">
					<a
						onClick={() => {
							let result = StatusOrder.find(
								(item) => item.value === parseInt(record.status)
							);
							setDetailId(record.id);
							let detailRecord = {
								...record,

								status: result && result.label,
								trans_date: moment(record.trans_date),
								start_date: moment(record.start_date),
								end_date: moment(record.end_date),
							};
							setInitialValues(detailRecord);
							reset(detailRecord);
							setIsModalVisible(true);
						}}
					>
						Detail
					</a>
					{/* <a onClick={() => onDelete(record.id)}>Close</a> */}
				</Space>
			),
		},
	];
	return (
		<>
			<Container>
				{" "}
				<Toolbar title={"Orders"} />
				<Table columns={columns} dataSource={dataSource} />
				{isModalVisible && (
					<Modal
						title="Order"
						visible={isModalVisible}
						footer={null}
						onCancel={handleClose}
						width={1000}
					>
						<form onSubmit={handleSubmit(handleActionSubmit)}>
							<Row gutter={24}>
								<Col className="gutter-row" span={12}>
									<div style={{ marginBottom: "14px" }}>
										<TextField
											name="code"
											control={control}
											label="Code"
											disabled={true}
											errormessage={errors.code?.message}
										/>
									</div>
									<div style={{ marginBottom: "14px" }}>
										<SelectField
											name="product_id"
											control={control}
											label="Product"
											options={dataProduct}
											disabled={true}
											errormessage={errors.product_id?.message}
										/>
									</div>
									<div style={{ marginBottom: "14px" }}>
										<SelectField
											name="users_id"
											control={control}
											label="User"
											options={dataUser}
											disabled={true}
											errormessage={errors.users_id?.message}
										/>
									</div>
									<div style={{ marginBottom: "14px" }}>
										<TextField
											name="qty"
											control={control}
											label="Quantity"
											disabled={true}
											errormessage={errors.qty?.message}
										/>
									</div>
								</Col>
								<Col className="gutter-row" span={12}>
									<div style={{ marginBottom: "14px" }}>
										<InputPicker
											name="trans_date"
											control={control}
											label="Trans Date"
											disabled={true}
											errormessage={errors.trans_date?.message}
										/>
									</div>
									<div style={{ marginBottom: "14px" }}>
										<InputPicker
											name="start_date"
											control={control}
											label="Start Date"
											disabled={true}
											errormessage={errors.start_date?.message}
										/>
									</div>
									<div style={{ marginBottom: "14px" }}>
										<InputPicker
											name="end_date"
											control={control}
											label="End Date"
											disabled={true}
											errormessage={errors.end_date?.message}
										/>
									</div>
									<div style={{ marginBottom: "14px" }}>
										<TextField
											name="status"
											control={control}
											label="Status"
											disabled={true}
											errormessage={errors.status?.message}
										/>
									</div>
								</Col>
							</Row>
							<div style={{ marginBottom: "14px" }}>
								<SelectField
									name="driver_id"
									control={control}
									label={
										initialValues.status === "To Receive" ? "Courier" : "Select Courier"
									}
									options={dataDriver}
									disabled={initialValues.status === "To Receive" ? true : false}
									errormessage={errors.driver_id?.message}
								/>
							</div>
							<div
								style={{
									display: "flex",
									flexDirection: "row",
									justifyContent:
										initialValues.status === "To Receive" ? "flex-end" : "space-between",
									paddingTop: "24px",
								}}
							>
								{initialValues.status === "To Receive" ? (
									<Button key="back" onClick={handleClose}>
										Close
									</Button>
								) : (
									<>
										<Button key="back" type="danger" onClick={CancelOrder}>
											Reject Order
										</Button>
										<Button htmlType="submit" key="submit" type="primary">
											Process Order
										</Button>
									</>
								)}
							</div>
						</form>
					</Modal>
				)}
			</Container>
		</>
	);
};

export default ListOrder;
