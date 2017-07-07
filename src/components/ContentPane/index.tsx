import * as React from 'react';
import './index.scss';

interface Props {
	children?: string | JSX.Element;
	toolbar?: string | JSX.Element;
	className?: string;
}

const ContentPanel: React.StatelessComponent<Props> = (props: Props): JSX.Element => {
	 const { children, toolbar, className } = props;

	 return (
		<div className="pane-content">
			{ toolbar && <div className="pane-content-header">
				{ toolbar }	
			</div>}
			<div className={`pane-content-body ${className || ''}`.trim()}>
				{ children }			   
			</div>
		</div>
	);
};

export default ContentPanel;
