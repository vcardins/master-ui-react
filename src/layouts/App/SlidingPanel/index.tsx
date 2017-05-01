import * as React from 'react';
import './index.scss';

interface Props {
    position?: string;
    children?: JSX.Element;
}

const SlidingPanel: React.StatelessComponent<Props> = (props: Props): JSX.Element => {
     const { children, position = 'right' } = props;

     return (
        <div id="sliding-pannel" className={position}>
            <div className="trigger">
                <i className="pin icon"></i>
            </div>
            <div id="sliding-panel-content">
                {children}
            </div>
        </div>
    );
};

export default SlidingPanel;

