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
  lookup: ['lookup', 'models'],
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
        const { lookup, ajax } = this.props;
        // tslint:disable-next-line:no-string-literal
        const models = lookup['countries'];

        return (
            <Page 
                id="country" 
                title="Countries" 
                subTitle="World Countries"
                hasFixedHeader={true}
                panels={[
                    <CountriesList key="list" models={ models } isLoading={ ajax.loading }/>,
                ]} 
            />
        );
    }    
}

export default animateTransition()(CountriesContainer);
