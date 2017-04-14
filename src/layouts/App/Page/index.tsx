import * as React from 'react';
import { Link } from 'react-router';
import { Segment, Icon } from 'semantic-ui-react';
import './index.scss';

interface Props {
    id?: string;
    title: string;
    subTitle?: string;
    className?: string;    
    children?: string | JSX.Element;
    hideTitleBar?: boolean;
    hasFixedHeader?: boolean;
    panels?: Array<string | JSX.Element>;
}

const Page: React.StatelessComponent<Props> = (props: Props): JSX.Element => {
    const { id, title, subTitle, children, className, panels = [], hideTitleBar, hasFixedHeader } = props;
    const classNames = ['page-content'];
    
    if (hasFixedHeader) {
        classNames.push('fixed-pane-header');
    }

    if (panels.length > 1) {
        classNames.push(`multi-pane-${panels.length}`);
    }

    if (className) {
        classNames.push(className);
    }

    const body = panels.map((panel, i) => {
            const key = `pane-${i + 1}`;
            return <div className={hasFixedHeader ? 'pane' : ''} id={key} key={key}>{panel}</div>;
        });

    return (
         <div id={id}>
            {!hideTitleBar && <div className="page-header">
                <span className="page-title">{title}</span>
                <span className="page-subtitle">{subTitle}</span>
            </div>}
            <div className={classNames.join(' ')}>
                {body}
            </div>            
        </div>      
    );
};

export default Page;
