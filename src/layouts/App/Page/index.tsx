import * as React from 'react';
import { Link } from 'react-router';
import { Segment, Icon } from 'semantic-ui-react';
import './index.scss';

interface Props {
    id?: string;
    title: string;
    subTitle?: string;
    className?: string;    
    children?: React.ReactNode;
    hideTitleBar?: boolean;
    panels?: Array<React.ReactNode>;
}

const Page: React.StatelessComponent<Props> = (props: Props): JSX.Element => {
    const { id, title, subTitle, children, className, panels = [], hideTitleBar } = props;
    const classNames = ['page-content'];
    
    if (panels.length > 1) {
        classNames.push('multi-pane');
    }

    if (className) {
        classNames.push(className);
    }

    return (
         <div id={id}>
            {!hideTitleBar && <div className="page-header">
                <span className="page-title">{ title }</span>
                <span className="page-subtitle">{ subTitle }</span>
            </div>}
            <div className={classNames.join(' ')}>
                {                     
                    panels && panels.map((panel, i) => {
                        const key = `pane-${i + 1}`;
                        return <div className="pane" id={key} key={key}>{ panel }</div>;
                    }) 
                }
            </div>            
        </div>      
    );
};

export default Page;
