import * as React from 'react';
import { Link } from 'react-router';
import { Icon } from 'semantic-ui-react';
import IMenuItem from '../App/IMenuItem';
import './index.scss';

interface Props {
	routes: Array<IMenuItem>;
	position: string;
	activeRoute: string;
}

const Nav: React.StatelessComponent<Props> = (props: Props): JSX.Element => {
	const { routes, position = 'vertical', activeRoute } = props;

	const toggleSubmenu = ({target}) => {
		const isParent = target.classList.contains('parentLevel');
		const el = isParent ? target : target.closest('.parentLevel');
		
		if (!el) {
			return;
		}

		// if (isParent) {
		// 	 el.classList.toggle('expanded');
		// } 
		// else {
		// 	 if (!el.classList.contains('expanded')) {
		// 		 el.classList.add('expanded');
		// 	 }
		// }
	};   
	
	const getMenuItem = ({ id, href, label, icon, children = [], isChild = false }) => {
		const hasChildren = children.length > 0;
		const Tag: any = Link; 
		const props = Object.assign({}, !hasChildren ? { to: href } : undefined);
		const className = `${href === activeRoute ? 'active' : ''} ${hasChildren ? 'parentLevel' : ''}`.trim();

		return (
			<li key={id} 
				id={`mnu-${id}`} 
				onClick={hasChildren || isChild ? toggleSubmenu : () => {}} 
				className={className}>
				<Tag {...props}>
					{ icon && !isChild && <Icon name={ icon } /> }
					{ label }
					{ hasChildren && <Icon className="chevron down expander"></Icon>}
				</Tag>
				{ hasChildren && 
				<ul className="submenu">
					{/*<li className="placeholder"></li>*/}
					{ children.map((item) => getMenuItem(Object.assign({}, item, { isChild: true }))) }
				</ul> 
				}
			</li>
		);
	};
	
	return (
		<ul className={`menu ${position}`}>
			{routes.map(getMenuItem)}
		</ul>
	); 
};

export default Nav;
