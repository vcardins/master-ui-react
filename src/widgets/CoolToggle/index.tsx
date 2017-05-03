import * as React from 'react';
import './index.scss';

interface Props {
    id?: string;
    label?: string;
    checked?: boolean;
    aligment?: string;
    type?: string;
    onChange: (event: any) => void;
}

const CoolToggle: React.StatelessComponent<Props> = (props: Props): JSX.Element => {
     const { id, label, checked, onChange, aligment = 'right', type = 'flat' } = props;

     return (
        <div className="tgl-item">            
            <div className="tgl-button">
                <input type="checkbox" className={`tgl ${type} ${aligment}`} id={id} onChange={onChange} checked={checked} />
                <label htmlFor={id} className="tgl-btn"></label>
            </div>
            <div className="tgl-label">
                { label }
            </div>
        </div>
    );
};

export default CoolToggle;
