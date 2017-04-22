/* https://medialoot.com/blog/how-to-create-a-responsive-navigation-menu-using-only-css/ */
/* https://codepen.io/wanni/pen/zsDJb */
import * as React from 'react';
import { Link } from 'react-router';
import { Menu, Icon } from 'semantic-ui-react';
import './index.scss';

interface Props {
    routes: Array<any>;
    position: string;
    activeRoute: string;
}

const Nav: React.StatelessComponent<Props> = (props: Props): JSX.Element => {
    const { routes, position = 'vertical', activeRoute } = props;

    const toggleSubmenu = ({target}) => {
        const isParent = target.parentNode.classList.contains('parentLevel');
        const el = isParent ? target.parentNode : target.parentNode.closest('.parentLevel');
        if (isParent) {
            el.classList.toggle('expanded');
        } 
        else {
            if (!el.classList.contains('expanded')) {
                el.classList.add('expanded');
            }
        }
    };   
    
    const getMenuItem = ({ id, href, label, icon, children = [], isChild = false }) => {
        const hasChildren = children.length > 0;
        const Tag: any = Link; 
        const props = Object.assign({}, !hasChildren ? { to: href } : {}, { onClick: hasChildren || isChild ? toggleSubmenu : null });
        
        return (<li key={id} id={`mnu-${id}`} className={`${href === activeRoute ? 'active' : ''} ${hasChildren ? 'parentLevel' : ''}`.trim()}>
            <Tag {...props}>
                { icon && !isChild && <Icon name={ icon } /> }
                { label }
                { hasChildren && <span className="expander"><Icon className="chevron right"></Icon></span>}
            </Tag>
            { hasChildren && <ul className="submenu">{children.map((item) => getMenuItem(Object.assign({}, item, {isChild: true})))}</ul> }
        </li>);
    };
    
    const nav = routes.map(getMenuItem);
  
    return <ul className={`menu ${position}`}>{nav}</ul>;
};

export default Nav;
