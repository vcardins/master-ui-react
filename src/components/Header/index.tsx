import * as React from 'react';
import { browserHistory, Link } from 'react-router';
import { Icon, Image, Dropdown } from 'semantic-ui-react';
import Logo from '../Logo';
import IMenuItem from '../IMenuItem';
import { UserProfile } from 'core/auth';
import appSettings from 'core/settings';
import toast from 'core/helpers/toast';
import Nav from '../Nav';
import './index.scss';

interface Props {
    user?: UserProfile;
    title?: string;
    onLogout: () => void;    
    onTogglePanel: (side: string) => void;
    routes?: Array<IMenuItem>;
    activeRoute?: string;
}

const Header: React.StatelessComponent<Props> = (props: Props): JSX.Element => {
    const { title, onTogglePanel, onLogout, user, routes, activeRoute } = props;

    const trigger = (
        <div className="profile">
            <div className="photo">
                <Image avatar src={`https://avatars.io/twitter/${user.username}`} /> 
            </div>
            <div className="info">
                <span className="greetings">Hello,</span> 
                <span className="name">{ user.fullName }</span>
            </div>
        </div>
    );

    const options = [
        { key: 'settings', text: 'Profile', icon: 'user', onClick: () => browserHistory.replace('/user-profile')  },
        { key: 'toast', text: 'Show Notification', icon: 'sign out', onClick: () => toast.info('Message') },
        { key: 'sign-out', text: 'Sign Out', icon: 'sign out', onClick: onLogout },
    ];

    const DropdownUserProfile = () => (
        <Dropdown trigger={trigger} options={options} pointing="top right" icon={null} />
    );

    return (
        <header id="header">
            <div className="header-left">
                <span className="header-logo">
                    <Icon name="diamond"/>
                </span>
                <span className="header-title">
                    <Link to="/">{ title }</Link>
                </span>
            </div>
            <div className="header-central">
                { routes && <Nav routes={routes} position="horizontal" activeRoute={activeRoute}/> }
            </div>
            <div className="header-right">                
                <DropdownUserProfile/>                
            </div>
        </header>
    );
};

export default Header;
