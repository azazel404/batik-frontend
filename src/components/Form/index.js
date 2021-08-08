import React from "react";
import { useController } from "react-hook-form";
import {
	Input,
	Select,
	DatePicker,
	Typography,
	InputNumber,
	// Radio,
	// Cascader,
	// InputNumber,
	// TreeSelect,
	// Switch,
	TimePicker,
} from "antd";
import Separator from "../separator";
import moment from "moment";
import "./styles.css";

const { Text } = Typography;
const { TextArea } = Input;

export function TextField(props) {
	const { control, name, label, errormessage } = props;
	const {
		field: { ref, ...inputProps },
		meta: { invalid, isTouched, isDirty },
	} = useController({
		name,
		control,
		// rules: { required: true },
		defaultValue: "",
	});

	return (
		<>
			<Text>{label}</Text>
			<Separator variant="vertical" size="8" />
			<Input {...inputProps} {...props} />
			<Separator variant="vertical" size="8" />
			{errormessage && (
				<small className="handle-text-error handle-error-animation">{errormessage}</small>
			)}
		</>
	);
}

export function TextNumber(props) {
	const { control, name, label, errormessage, min, max } = props;
	const {
		field: { ref, ...inputProps },
		meta: { invalid, isTouched, isDirty },
	} = useController({
		name,
		control,
		// rules: { required: true },
		defaultValue: "",
	});

	return (
		<>
			<Text>{label}</Text>
			<Separator variant="vertical" size="8" />
			<InputNumber min={min} max={max} {...inputProps} {...props} />
			<Separator variant="vertical" size="8" />
			{errormessage && (
				<small className="handle-text-error handle-error-animation">{errormessage}</small>
			)}
		</>
	);
}

export function TextFieldArea(props) {
	const { control, name, label, errormessage, rows } = props;
	const {
		field: { ref, ...inputProps },
		meta: { invalid, isTouched, isDirty },
	} = useController({
		name,
		control,
		// rules: { required: true },
		defaultValue: "",
	});

	if (props.isTouched) {
		props.isTouched(isDirty);
	}

	return (
		<>
			<Text>{label}</Text>
			<Separator variant="vertical" size="8" />
			<TextArea {...inputProps} {...props} rows={rows} />
			<Separator variant="vertical" size="8" />
			{errormessage && (
				<small className="handle-text-error handle-error-animation">{errormessage}</small>
			)}
		</>
	);
}

export function SelectField(props) {
	const { Option } = Select;

	const { control, name, options, allowClear, mode, label, errormessage } = props;
	const {
		field: { ref, ...inputProps },
		meta: { invalid, isTouched, isDirty },
	} = useController({
		name,
		control,
		defaultValue: mode === "multiple" ? [] : "",
	});

	if (props.isTouched) {
		props.isTouched(isTouched);
	}

	// function onFocus() {
	// 	console.log("focus");
	// }

	// function onSearch(val) {
	// 	console.log("search:", val);
	// }

	return (
		<>
			<Text>{label}</Text>
			<Separator variant="vertical" size="8" />
			<Select
				// showSearch
				style={{ width: "100%" }}
				// placeholder="Search to Select"
				mode={mode}
				allowClear={allowClear}
				{...inputProps}
				{...props}
				optionFilterProp="children"
				// filterOption={(input, option) =>
				// 	option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
				// }
				// filterSort={(optionA, optionB) =>
				// 	optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
				// }
			>
				{options
					? options.map((item) => {
							return (
								<>
									<Option value={item.value}>{item.label}</Option>
								</>
							);
					  })
					: []}
			</Select>
			{errormessage && (
				<small className="handle-text-error handle-error-animation">{errormessage}</small>
			)}
		</>
	);
}

export const InputPicker = (props) => {
	const { control, name, label } = props;

	const {
		field: { ref, ...inputProps },
		meta: { invalid, isTouched, isDirty },
	} = useController({
		name,
		control,
		// rules: { required: true },
		defaultValue: moment(),
	});

	const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY"];

	return (
		<>
			<Text>{label}</Text>
			<Separator variant="vertical" size="8" />
			<DatePicker
				style={{ width: "100%" }}
				{...inputProps}
				{...props}
				format={dateFormatList}
			/>
		</>
	);
};

export const TimeInputPicker = (props) => {
	const { control, name, label } = props;

	const {
		field: { ref, ...inputProps },
		meta: { invalid, isTouched, isDirty },
	} = useController({
		name,
		control,
		// rules: { required: true },
		defaultValue: moment(),
	});

	const format = "HH:mm";

	return (
		<>
			<Text>{label}</Text>
			<Separator variant="vertical" size="8" />
			<TimePicker style={{ width: "100%" }} {...inputProps} {...props} format={format} />
		</>
	);
};
