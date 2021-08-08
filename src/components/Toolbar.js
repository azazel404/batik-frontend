import React from "react";
import Separator from "./separator";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button } from "antd";
// import "./style.scss";

const Toolbar = (props) => {
	const { customActions, onBackButton } = props;
	const BackButton = () => {
		if (props.onBackButton) {
			return (
				<>
					<div>
						<Button
							style={{
								borderRadius: "8px",
								background: "#f1f1f5",
								color: "#696974",
							}}
							onClick={props.backButton}
							type="text"
							icon={
								<ArrowLeftOutlined
									style={{
										fontSize: "18px",
										fontWeight: "bold",
										paddingTop: "4px",
									}}
								/>
							}
						/>
					</div>{" "}
					<Separator variant="horizontal" size="16" />
				</>
			);
		}
	};
	return (
		<>
			<div
				style={{
					display: "flex",
					flexDirection: "row",
					alignItems: "center",
					paddingBottom: "24px",
					justifyContent: "space-between",
				}}
			>
				<div
					style={{
						display: "flex",
						flexDirection: "row",
						alignItems: "center",
					}}
				>
					{BackButton()}
					<div
						style={{
							padding: "0",
							fontWeight: "bold",
							color: "#000000",
							fontSize: onBackButton ? "16px" : "24px",
						}}
					>
						{props.title}
					</div>
				</div>
				{customActions && customActions()}
			</div>
		</>
	);
};

export default Toolbar;
