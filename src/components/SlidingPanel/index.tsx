import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.scss';

interface Props {
	position?: string;
	children?: JSX.Element;
}

const SlidingPanel: React.StatelessComponent<Props> = (props: Props): JSX.Element => {
	 const { children, position = 'right' } = props;
	 const elTag = 'sliding-panel';

	 const handleOnChange = ({target : {checked}}) => {
		const container = document.getElementById(elTag);
		if (container instanceof HTMLElement) {
			container.classList[checked ? 'add' : 'remove']('expanded');
		}
	 };

	 return (
		<div id={elTag} className={position} >
			<div className={`${elTag}-trigger`}>
				<input type="checkbox" id={`${elTag}-pin`} className={`${elTag}-trigger-checkbox`} onChange={handleOnChange}/>
				<label htmlFor={`${elTag}-pin`} className={`${elTag}-trigger-pinner`}>
					<i className="pin icon"></i>
				</label>
			</div>
			<div id={`${elTag}-content`}>
				{ children }
			</div>
		</div>
	);
};

export default SlidingPanel;

