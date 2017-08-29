import * as React from 'react';
import shadeBlendConvert from './shadeBlendConvert';
import './index.scss';

interface Props {
	id?: string;
	label?: string;
	value?: boolean;
	onChange?: (event: any) => void;
}

const ColorSchemaPicker: React.StatelessComponent<Props> = (props: Props): JSX.Element => {
	const { id = 'choose-theme-color', label = '', value, onChange } = props;

	const themeColorProp = 'themeColor';
	const themeLightColorProp = 'themeLightColor';  
	const themeLighterColorProp = 'themeLighterColor';  
	const themeLightestColorProp = 'themeLightestColor';  
	const factor = 0.25;

	const setStyleProperty = (prop: string, value: string) => {
		document.documentElement.style.setProperty(prop, value);
	};

	const setColorProperties = (value: string) => {		
		setStyleProperty(`--${themeColorProp}`, value);
		setStyleProperty(`--${themeLightColorProp}`, value && shadeBlendConvert(value, factor));
		setStyleProperty(`--${themeLighterColorProp}`, value && shadeBlendConvert(value, factor * 2));
		setStyleProperty(`--${themeLightestColorProp}`, value && shadeBlendConvert(value, factor * 3));
		localStorage.setItem(themeColorProp, value);
		if (typeof onChange === 'function') {
			onChange(value);
		}
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		e.stopPropagation();
		const { value } = e.target;
		setColorProperties(value);
	};
	
	const resetColor = (e: any) => {
		e.preventDefault();
		e.stopPropagation();
		localStorage.removeItem(themeColorProp);
		localStorage.removeItem(themeLightColorProp);
		localStorage.removeItem(themeLighterColorProp);
		localStorage.removeItem(themeLightestColorProp);
		setColorProperties(null);
	};

	const init = () => {
		const value = localStorage.getItem(themeColorProp);
		if (value && value !== 'null') {
			setColorProperties(value);
		}
	};
   
	init();

	return (
		<div className="color-schema-picker-container">
			{ label && <label>{ label }</label>}
			<span>
				<input type="color" id={id} onChange={ handleChange } />
				<a href="javascript:void(0)" onClick={resetColor} title="Reset Theme Color">×</a>
			</span>
		</div>
	);
	
};

export default ColorSchemaPicker;
