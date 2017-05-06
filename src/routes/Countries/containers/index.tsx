import * as React from 'react';
import { browserHistory } from 'react-router';
import CountriesList from '../components/List';
import Actions from '../Actions';
import Country from '../models/Country';
import Page from 'layouts/App/Page';
import { animateTransition } from 'core/decorators';

interface Props {
    children: JSX.Element;
    router: any;    
}

interface State {
    isLoading: boolean;
    models: Array<any>;
}

class CountriesContainer extends React.Component<Props, State>  {

    state: State = { 
        isLoading: false, 
        models: [],
    };

    constructor(props: Props) {
        super(props);
    }

    async componentDidMount() {           
        this.setState({isLoading: true});
        const models = await Actions.getCountries();
        this.setState({ models, isLoading: false });
    }

    render(): JSX.Element {
        const { isLoading, models } = this.state;

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
