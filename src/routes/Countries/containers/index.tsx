import * as React from 'react';
import * as ReactDOM from 'react-dom';
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

@animateTransition()
class CountriesContainer extends React.Component<Props, State>  {

    state: State = { 
        isLoading: false, 
        models: [],
    };

    constructor(props: Props) {
        super(props);
    }

    componentDidMount() {           
        this.setState({isLoading: true});
        Actions.getCountries()
            .then((models: any) => this.setState({ models, isLoading: false }));
    }

    render(): JSX.Element {
        const { isLoading, models } = this.state;

        return (
            <Page 
                id="enum" 
                title="Countries" 
                subTitle="World Countries"
                panels={[
                    <CountriesList key="list" models={ models } isLoading={ isLoading }/>,
                ]} 
            />
        );
    }    
}

export default CountriesContainer;
