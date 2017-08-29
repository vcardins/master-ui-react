import * as React from 'react';

interface IField {
	id?: any;
	name: string;
	label?: string;
	type: string;
	value?: any;
	onChange?: (name: string, text: string) => void;
}

const Field: React.StatelessComponent<IField> = (props: IField): JSX.Element => {

	const handleChange = (event: any) => {
		event.preventDefault();
		const text = event.target.value;
		if (typeof props.onChange === 'function' && text) {
			props.onChange(props.name, text.trim());
		}
	};

	const handleBlur = (event: any) => {
		handleChange(event);
	};

	return (
		<div className="field-editor">
			{ props.label && <label htmlFor={props.id}>{props.label}</label> }
			<input {...props} onChange={handleChange}  onBlur={handleBlur} />
		</div>
	);
};

function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min;
}

Field.defaultProps = { // now we can use defaultProps
	id: getRandomInt(0, 99999),
	type: 'text',
	name: '',
	label: null,
	value: undefined,
};

export default Field;
