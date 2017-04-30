import * as React from 'react';
import shadeBlendConvert from './shadeBlendConvert';

const ColorSchemaPicker: React.StatelessComponent<{}> = (): JSX.Element => {
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
        <span style={{margin: '0 10px', verticalAlign: 'middle'}}>
            <input type="color" id="choose-theme-color" onChange={ handleChange } />
            <a href="javascript:void(0)" style={{margin: '0 5px'}} onClick={resetColor} title="Reset Theme Color">×</a>
        </span>
    );
    
};

export default ColorSchemaPicker;
