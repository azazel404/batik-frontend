import React from "react";

const Separator = (props) => {
	const size = props.size ? props.size : 16;
	const variant = props.variant ? props.variant : "vertical";
	// const display = props.display ? props.display : "inline-block";
	const display = (props.inline ? "inline-" : "") + "block";

	const style = {
		[variant === "horizontal" ? "width" : "height"]: `${size}px`,
		display: display,
	};

	return <div style={style} />;
};

export default Separator;
