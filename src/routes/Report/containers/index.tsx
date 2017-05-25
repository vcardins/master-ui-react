import * as React from 'react';
import Report from '../components/Report';
import Page from 'components/Page';
import { DOM } from 'core/helpers';
import { animateTransition } from 'core/decorators';

interface Props {
    children: JSX.Element;
    router: any;    
}

interface State {
}

@animateTransition()
class ReportContainer extends React.Component<Props, State>  {
    
    constructor(props: Props) {
        super(props);
    }    

    render(): JSX.Element {
        return (
            <Page 
                id="report" 
                title="Reports" 
                subTitle="Reports Reports Reports Reports"
                className="padded"
                panels={[
                    <Report 
                        header="Header"
                        description="This is the Report page."
                    />,
                ]} 
            />
        );
    }
}

export default ReportContainer;
