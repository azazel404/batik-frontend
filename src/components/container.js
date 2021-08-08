import React from "react";

const Container = (props) => {
	const { children, minHeight, space = 16, radius = "12px", width = "100%" } = props;
	return (
		<>
			<div
				style={{
					padding: space,
					minHeight: minHeight,
					background: " #fff",
					borderRadius: radius,
					width: width,
				}}
			>
				{children}
			</div>
		</>
	);
};

export default Container;
