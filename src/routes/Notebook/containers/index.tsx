import * as React from 'react';
import { browserHistory } from 'react-router';
import { Grid, Segment, Message, Header, Icon, Table } from 'semantic-ui-react';
import Actions from '../Actions';
import NotebookList from '../components/List';
import NotebookForm from '../components/Form';
import Notebook from '../models/Notebook';
import Page from 'layouts/App/Page';
import { animateTransition } from 'core/decorators';
import { DOM } from 'core/helpers';

interface Props {
    children: JSX.Element;
    router: any;
    params: any; 
}

interface State {
    isLoading: boolean;
    isSaving: boolean;
    models?: Array<Notebook>;
    model?: Notebook;
    validationErrors: any;
}

class NotebookContainer extends React.Component<Props, State>  {
    
    formPanel: HTMLElement;    
    state: State = { 
        isLoading: false, 
        isSaving: false,
        models: new Array<Notebook>(),
        model: new Notebook(), 
        validationErrors: {},
    };

    constructor(props: Props) {
        super(props);
        this.handleSelect = this.handleSelect.bind(this);
        this.loadModels = this.loadModels.bind(this);
    }
    
    componentDidMount() {                   
        this.formPanel = document.getElementById('pane-2').getElementsByClassName('form')[0] as HTMLElement;
        this.setState({isLoading: true}, this.loadModels);              
    }

    async loadModels() {
        const { id } = this.props.params;
        this.setState({ isLoading: true });
        const models = await Actions.getAll();
        const model = (!!id && models.filter(({id}) => id === id)[0]) || new Notebook();            
        this.setState({ models, model, isLoading: false });
    }

    handleFieldChange (event: any): void {
        event.preventDefault();
        const { name, value } = event.target;
        const state = Object.assign({}, {}, this.state.model);
        state[name] = value;
        this.setState({ model: state });
    }

    async handleSignup (event) {
        event.preventDefault();
        const { model } = this.state;

        this.setState({ isSaving: true });
        const response = await Actions.save(model, true);
        if (!response.error) {
            this.setState({ isSaving: false });
        } else {
            const validationErrors = [];
            // new FormValidationError(response);
            console.log(validationErrors);
            // const validationErrors = [].concat(new FormValidationError(response.message, '', 'username'));
            this.setState({ isSaving: false, validationErrors });    
        }
    }

    isFormValid(): boolean {
        const { model } = this.state;
        return true; // model.isValid();
    }

    handleSelect(model) {
        DOM.animateElement(this.formPanel, () => {
            this.setState({ model });
            // Setting the routing slow down the model loading
            setTimeout(() => this.props.router.push(`/notebook/${model.id}`), 0); 
        }, 100);
    }

    render(): JSX.Element {
        const { isLoading, isSaving, models, model, validationErrors } = this.state;
        const panels: Array<string | JSX.Element> = 
        [
            <NotebookList 
                key="list"
                models={ models } 
                selected={ model }
                filter={'true'} 
                onSelected={ this.handleSelect }
                isLoading={ isLoading }
            />,
            <NotebookForm 
                key="form"                
                model={ model }
                onSubmit={ this.handleSignup }
                onChange={ this.handleFieldChange }
                errors={ validationErrors }
                isSaving={ isSaving }
                isValid={ this.isFormValid() }
            />,
        ];
        
        return (
            <Page id="notebook" 
                title="Notebook" 
                subTitle="Country notebook"
                hasFixedHeader={true}
                panels={ panels } />
        );
    } 
}

export default animateTransition()(NotebookContainer);
