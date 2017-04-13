import * as React from 'react';
import { Icon, Button, Popup } from 'semantic-ui-react';
import './index.scss';

interface Props {
    children?: React.ReactNode;
    toolbar?: React.ReactNode;
    className?: string;
}

const ContentPanel: React.StatelessComponent<Props> = (props: Props): JSX.Element => {
     const { children, toolbar, className } = props;

     return (
        <div className="content-pane">
            { toolbar && <div className="content-pane-header">
                { toolbar }    
            </div>}
            <div className={`content-pane-body ${className}`}>
                { children }               
            </div>
        </div>
    );
};

export default ContentPanel;
