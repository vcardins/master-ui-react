import * as React from 'react';
import { Link } from 'react-router';
import { Sidebar, Segment, Icon, Menu, Input } from 'semantic-ui-react';
import Logo from '../Logo';
import Nav from '../Nav';
import IMenuItem from '../../interfaces/IMenuItem';
import UserInfo from './components/UserInfo';
import { UserProfile } from 'core/auth';
import FullScreen from 'widgets/FullScreen';
import './index.scss';

interface Props {
    collapsed: boolean;
    user?: UserProfile;
    routes?: Array<IMenuItem>;
    onTogglePanel?: () => void;
    onOpenSettings?: () => void;
    showUserInfo?: boolean;
    activeRoute?: string;
}

const LeftPanel: React.StatelessComponent<Props> = (props: Props): JSX.Element => {
    const { routes, collapsed = false, onTogglePanel, onOpenSettings, user, showUserInfo = false, activeRoute } = props;
    let activeItem: string = '';

    return (
        <aside className="nav">
            { showUserInfo && <UserInfo user={user}/>}
            <nav className="nav-options">
                <div className="searchbox">
                    <Input icon="search" placeholder="Search ..." />
                </div>
                { routes && <Nav routes={routes} position="vertical" activeRoute={activeRoute}/> }
            </nav>
            <footer className="nav-footer">
                <a href="javascript:void(0)" title="Expand/Collapse" onClick={onTogglePanel} className="toggle-collapse">
                    <Icon name="angle double left" aria-hidden="true" />
                </a>                
                <a href="javascript:void(0)" title="Settings" onClick={onOpenSettings} className="open-settings">
                    <Icon name="cogs" aria-hidden="true" />
                </a>
                <FullScreen title="FullScreen" className="toggle-fullscreen" />
            </footer>
        </aside>        
    );
};

export default LeftPanel;
