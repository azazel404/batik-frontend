import React from "react";
import { TextField, SelectField } from "../../components/Form";
import Container from "../../components/container";
import Toolbar from "../../components/Toolbar";
import { Button, Modal, Table, Space, Image } from "antd";
import ProductAPI from "../../api/ProductAPI";
import CategoryAPI from "../../api/CategoryAPI";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import swal from "sweetalert";

const schema = yup.object().shape({
	code: yup.string().required(),
	name: yup.string().required(),
});

const ListDriver = (props) => {
	const [isModalVisible, setIsModalVisible] = React.useState(false);
	const [dataSource, setDataSource] = React.useState([]);
	const [dataCategory, setDataCategory] = React.useState([]);
	const [detailId, setDetailId] = React.useState(null);
	const [image, setImage] = React.useState(null);
	const [initialValues, setInitialValues] = React.useState({
		code: "",
		name: "",
		price: "",
		image: "",
		description: "",
		category_id: "",
		stock: "",
		weight: "",
	});

	const { register, handleSubmit, control, errors, reset } = useForm({
		resolver: yupResolver(schema),
		defaultValues: initialValues,
	});

	const showModal = () => {
		setIsModalVisible(true);
	};

	const handleActionSubmit = (values) => {
		var formData = new FormData();
		formData.append("code", values.code);
		formData.append("name", values.name);
		formData.append("price", values.price);
		// if (values.image[0] !== undefined) {
		// 	formData.append("image", image);
		// }
		formData.append("image", image);

		formData.append("description", values.description);
		formData.append("category_id", values.category_id);
		formData.append("stock", values.stock);
		formData.append("weight", values.weight);
		let fetch;
		if (detailId !== null) {
			fetch = ProductAPI.update(detailId, formData);
		} else {
			fetch = ProductAPI.create(formData);
		}
		fetch
			.then((res) => {
				setIsModalVisible(false);
				swal("Message", "Successfully processed", "success");
				reset({});
				retrieveDataProduct();
			})
			.catch((err) => {
				console.log("err", err);
			});
	};

	const onDelete = (id) => {
		ProductAPI.delete(id)
			.then((res) => {
				retrieveDataProduct();
				swal("Message", "successfully deleted", "success");
			})
			.catch((err) => {
				console.log("err", err);
			});
	};

	const retrieveDataProduct = () => {
		ProductAPI.getList()
			.then((res) => {
				setDataSource(res.data.data);
			})
			.catch((err) => {
				console.log("err", err);
			});
	};

	const retrieveDataCategory = () => {
		CategoryAPI.getList()
			.then((res) => {
				let result = res.data.data.map((item) => {
					return {
						label: item.name,
						value: item.id,
					};
				});
				setDataCategory(result);
			})
			.catch((err) => {
				console.log("err", err);
			});
	};

	React.useEffect(() => {
		retrieveDataProduct();
		retrieveDataCategory();
	}, []);

	const handleClose = () => {
		setIsModalVisible(false);
		reset({});
	};

	const uploadImage = (e) => {
		e.preventDefault();

		let reader = new FileReader();
		let file = e.target.files[0];

		reader.onloadend = () => {
			setImage(file);
		};

		reader.readAsDataURL(file);
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
					Add Product
				</Button>
			</>
		);
	};

	console.log("test", initialValues);

	const columns = [
		{
			title: "Image Product",
			dataIndex: "image",
			key: "image",
			render: (text, record) => {
				let result = record.image ? (
					<Image src={record.image} width={240} style={{ border: "1px solid #d9d9d9" }} />
				) : (
					"No Image"
				);
				return result;
			},
		},
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
			title: "Price",
			dataIndex: "price",
			key: "price",
		},
		{
			title: "Stock",
			dataIndex: "stock",
			key: "stock",
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
				<Toolbar title={"Products"} customActions={toolbarActions} />
				<Table columns={columns} dataSource={dataSource} />
				{isModalVisible && (
					<Modal
						title="Product"
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
									name="description"
									control={control}
									label="Description"
									errormessage={errors.description?.message}
								/>
							</div>
							<div style={{ marginBottom: "14px" }}>
								<SelectField
									name="category_id"
									control={control}
									options={dataCategory}
									label="Category Product"
									errormessage={errors.category_id?.message}
								/>
							</div>
							<div style={{ marginBottom: "14px" }}>
								<TextField
									name="price"
									control={control}
									label="Price"
									errormessage={errors.price?.message}
								/>
							</div>
							<div style={{ marginBottom: "14px" }}>
								<TextField
									name="stock"
									control={control}
									label="Stock"
									errormessage={errors.stock?.message}
								/>
							</div>
							<div style={{ marginBottom: "14px" }}>
								<TextField
									name="weight"
									control={control}
									label="Weight(optional)"
									errormessage={errors.weight?.message}
								/>
							</div>
							<div style={{ marginBottom: "14px" }}>
								<input
									onChange={(e) => uploadImage(e)}
									type="file"
									name="image"
									{...register("image")}
									accept="image/png, image/jpeg"
								/>
								{/* <input
									ref={register}
									type="file"
									name="image"
									accept="image/png, image/jpeg"
								/> */}
							</div>

							{/* image */}
							{/* <div style={{ marginBottom: "14px" }}>
								<TextField
									name="weight"
									control={control}
									label="Weight(optional)"
									errormessage={errors.weight?.message}
								/>
							</div> */}
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
