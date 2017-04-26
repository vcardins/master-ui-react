import * as React from 'react';
import { browserHistory } from 'react-router';
import CountriesList from '../components/List';
import Actions from '../Actions';
import Country from '../models/Country';
import Page from 'components/Page';
import { animateTransition } from 'core/decorators';
import { branch } from 'baobab-react/higher-order';

interface Props {
    children: JSX.Element;
    router: any;
    lookup: Array<any>;
    ajax: any;
}

interface State {
    isLoading: boolean;
}

@branch({
  lookup: ['lookup'],
  ajax: ['ajax'],
})
class CountriesContainer extends React.Component<Props, State>  {

    state: State = { 
        isLoading: false, 
    };

    constructor(props: Props) {
        super(props);
    }

    render(): JSX.Element {
        // tslint:disable-next-line:no-string-literal
        const lookup = this.props.lookup['models'];
        // tslint:disable-next-line:no-string-literal
        const models = !!lookup ? lookup['countries'] : [];
        // tslint:disable-next-line:no-string-literal
        const isLoading = this.props.ajax ? !!this.props.ajax['loading'] : false;
        console.log(models, isLoading);

        return (
            <Page 
                id="country" 
                title="Countries" 
                subTitle="World Countries"
                hasFixedHeader={true}
                panels={[
                    <CountriesList key="list" models={ models } isLoading={ isLoading }/>,
                ]} 
            />
        );
    }    
}

export default animateTransition()(CountriesContainer);
