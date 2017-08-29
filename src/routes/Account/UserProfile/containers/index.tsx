import * as React from 'react';
import UserSettings from '../components/UserSettings';
import UserTodo from '../components/UserTodo';
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
		const { user } = this.props;
		const panels: Array<string | JSX.Element> = 
		[
			<UserSettings user={user}/>,
			<UserTodo user={user}/>,
		];

		return (
			<Page 
				id="page-userprofile" 
				title={`${user.firstName} Profile`}  
				subTitle="User Profile"
				panels={panels}
				className="padded" />
		);
	}
}

export default UserProfileContainer;
