/* https://medialoot.com/blog/how-to-create-a-responsive-navigation-menu-using-only-css/ */
/* https://codepen.io/wanni/pen/zsDJb */
import * as React from 'react';
import { Link } from 'react-router';
import { Menu, Icon } from 'semantic-ui-react';
import './index.scss';

interface Props {
    routes: Array<any>;
    position: string;
}

const Nav: React.StatelessComponent<Props> = (props: Props): JSX.Element => {
    const { routes, position = 'vertical' } = props;

    const toggleSubmenu = ({target}) => {
        target.classList.toggle('active');
    };

    const getMenuItem = ({ id, href, label, icon, children = [] }) => (
        <Menu.Item 
            key={id} 
            name={id} 
            icon 
            onClick={children.length > 0 ? toggleSubmenu : null} 
            as={ Link } 
            to={ href } 
            label={ label } 
            className={children.length ? 'parentMenu' : null}>
            { icon && <Icon name={ icon } /> }
            <label>{ label }</label>
            { children.length > 0 && <div className="submenu">{children.map(getMenuItem)}</div> }
        </Menu.Item>
    );
    
    const nav = routes.map(getMenuItem);
  
    return <div>{nav}</div>;
};

export default Nav;
