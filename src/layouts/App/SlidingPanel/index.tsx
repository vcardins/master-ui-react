import * as React from 'react';
import './index.scss';

interface Props {
    id?: string;
    position?: string;
    children?: JSX.Element;
}

const SlidingPanel: React.StatelessComponent<Props> = (props: Props): JSX.Element => {
     const { id = 'sliding-panel-pin', children, position = 'right' } = props;

     const handleOnChange = ({target : {checked}}) => {
        const container = document.getElementById('sliding-pannel');
        if (checked) {
            container.classList.add('expanded');
        } 
        else {
            container.classList.remove('expanded');
        }
     };

     return (
        <div id="sliding-pannel" className={position}>
            <div className="sliding-pannel-trigger">
                <input type="checkbox" id={id} className="sliding-pannel-trigger-checkbox" onChange={handleOnChange}/>
                <label htmlFor={id} className="sliding-pannel-trigger-pinner">
                    <i className="pin icon"></i>
                </label>
            </div>
            <div id="sliding-panel-content">
                { children }
            </div>
        </div>
    );
};

export default SlidingPanel;

