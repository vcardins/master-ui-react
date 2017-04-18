import * as React from 'react';
import { Link } from 'react-router';
import { Sidebar, Segment, Icon, Menu, Input } from 'semantic-ui-react';
import Logo from '../Logo';
import UserInfo from './UserInfo';
import { UserProfile } from 'core/auth';
import FullScreen from 'widgets/FullScreen';
import './index.scss';

interface Props {
    routes: Array<any>;
    collapsed: boolean;
    user?: UserProfile;
    onTogglePanel?: () => void;
    showUserInfo?: boolean;
}

const LeftPanel: React.StatelessComponent<Props> = (props: Props): JSX.Element => {
    const { routes, collapsed = false, onTogglePanel, user, showUserInfo = false } = props;
    let activeItem: string = '';

    const handleItemClick = (e, { name }) => activeItem = name;

    // activeClassName="active"
    const nav = routes.map(({ id, href, label, icon }, i) =>
            <Menu.Item as={ Link } to={ href } key={id} icon title={ label }>
                <Icon name={ icon } />
                <label>{ label }</label>
            </Menu.Item>);

    return (
        <aside className="nav">
            { showUserInfo && <UserInfo user={user}/>}
            <nav className="nav-options">
                <div className="searchbox">
                    <Input icon="search" placeholder="Search ..." />
                </div>
                <Menu vertical>
                    { nav }
                </Menu>
            </nav>
            <footer className="nav-footer">
                <a href="javascript:void(0)" title="Expand/Collapse" onClick={onTogglePanel} className="toggle-collapse">
                    <Icon name="angle double left" aria-hidden="true" />
                </a>                
                <a href="javascript:void(0)" title="Settings" className="open-settings">
                    <Icon name="cogs" aria-hidden="true" />
                </a>
                <FullScreen title="FullScreen" className="toggle-fullscreen" />
            </footer>
        </aside>        
    );
};

export default LeftPanel;
