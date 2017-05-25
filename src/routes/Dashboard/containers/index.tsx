import * as React from 'react';
import Page from 'components/Page';
import Dashboard from '../components/Dashboard';
import { animateTransition } from 'core/decorators';

interface Props {
    children: JSX.Element;
    router: any;    
}

interface State {
    lookup: any;
}

@animateTransition()
class DashboardContainer extends React.Component<Props, State>  {
    
    state: State = { 
        lookup: {}, 
    };

    constructor(props: Props) {
        super(props);        
    }        

    render(): JSX.Element {
        return <Page 
            id="dashboard" 
            title="Dashboard" 
            hideTitleBar={true} 
            className="padded"
            panels={[
                    <Dashboard                 
                        header="Header"
                        lookup={ this.state.lookup }
                        description="This is the Dashboard page."
                    />,
                ]}
            />;
    }
}

export default DashboardContainer;
