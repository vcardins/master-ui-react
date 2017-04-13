import * as React from 'react';
import UserProfile from '../components/UserProfile';
import Page from 'layouts/App/Page';
import { DOM } from 'core/helpers';
import { animateTransition } from 'core/decorators';

interface Props {
    children: JSX.Element;
    router: any;    
}

interface State {
}

@animateTransition()
class UserProfileContainer extends React.Component<Props, State>  {
    
    constructor(props: Props) {
        super(props);
    }    

    render(): JSX.Element {
        const children = <UserProfile header="Header" description="This is the UserProfile page."/>;

        return (
            <Page 
                id="report" 
                title="User Profile" 
                subTitle="UserProfiles UserProfiles UserProfiles UserProfiles"
                panels={ [children] }
                className="padded">
                { children }
            </Page>
        );
    }
}

export default UserProfileContainer;
