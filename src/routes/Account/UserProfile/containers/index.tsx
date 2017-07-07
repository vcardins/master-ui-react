import * as React from 'react';
import UserProfile from '../components/UserProfile';
import Page from 'components/Page';
import { DOM } from 'core/helpers';
import { animateTransition } from 'core/decorators';
import { branch } from 'baobab-react/higher-order';

interface Props {
	children: JSX.Element;
	router: any;
	user: any;
}

interface State {
}

@branch({
  user: ['user', 'model'],
})
@animateTransition()
class UserProfileContainer extends React.Component<Props, State>  {
	
	constructor(props: Props) {
		super(props);
	}	

	render(): JSX.Element {
		const children = <UserProfile header="Header" description="This is the UserProfile page."/>;

		return (
			<Page 
				id="page-userprofile" 
				title="User Profile" 
				subTitle="User Profile"
				panels={ [children] }
				className="padded">
				{ children }
			</Page>
		);
	}
}

export default UserProfileContainer;
