import * as React from 'react';
import { Link } from 'react-router';
import { Image } from 'semantic-ui-react';
import { UserProfile } from 'core/auth';

interface Props {
	user?: UserProfile;
}

const UserInfo: React.StatelessComponent<Props> = (props: Props): JSX.Element => {
	const { user } = props;

	if (!user) {
		return null;
	}

	return (
		<div className="nav-header">
			<div className="user-pic">
				<Image src={`https://avatars.io/twitter/${user.username}`} shape="circular" />
			</div>
			<div className="user-details">
				<span className="user-greetings">Welcome, </span>
				<span className="user-name">
					<Link to="/user-profile">
						{ user ? user.fullName : '...' }
					</Link>
				</span>
			</div>
		</div>
	);
};

export default UserInfo;
