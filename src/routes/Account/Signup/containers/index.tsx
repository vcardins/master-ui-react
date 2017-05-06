import * as React from 'react';
import { browserHistory } from 'react-router';
import { animateTransition } from 'core/decorators';
import SignupForm from '../components/SignupForm';

import { ActionResult, FormValidationError } from 'core/models';
import { UserAction, UserSignup } from 'core/auth';
import { Grid, Segment, Message, Header, Icon } from 'semantic-ui-react';

import Validator from 'core/decorators/FormValidator';
import schema from '../schema';

interface Props {
    children: JSX.Element;
    router: any;    
}

interface State {
    isLoading: boolean;
    model: UserSignup;
    validationErrors: Array<FormValidationError>;
}

class SignUp extends React.Component<Props, State>  {

    state: State = { 
        isLoading: false, 
        model: new UserSignup(), 
        validationErrors: [], 
    };

    schema = schema;    

    constructor(props: Props, state: State) {
        super(props);
        this.handleSignup = this.handleSignup.bind(this); 
        this.handleFieldChange = this.handleFieldChange.bind(this);   
    }

    handleFieldChange = (event: any): void => {
        event.preventDefault();
        const { name, value } = event.target;
        const state = Object.assign({}, {}, this.state.model);
        state[name] = value;
        this.setState({ model: state });
    }

    async handleSignup (event) {
        event.preventDefault();
        const { model } = this.state;

        this.setState({ isLoading: true });
        const response: ActionResult = await UserAction.signup(model);
        if (!response.error) {
            this.setState({ isLoading: false });
            if (response.redirect) {
                browserHistory.replace(response.redirect);
            }      
        } else {
            const validationErrors = [];
            // new FormValidationError(response);
            console.log(validationErrors);
            // const validationErrors = [].concat(new FormValidationError(response.message, '', 'username'));
            this.setState({ isLoading: false, validationErrors });   
        }
    }

    isFormValid(): boolean {
        const { model } = this.state;
        // return model.isValid();

        return model.username.length > 0 
            && model.email.length > 0
            && model.password.length > 0
            && model.confirmPassword.length > 0;
    }

    render(): JSX.Element {
        const { children } = this.props;
        const { isLoading, validationErrors } = this.state;
        
        return (
            <div id="page-signup" className="page-account">                
                <Grid centered verticalAlign="middle">
                    <Grid.Column>
                        <Validator schema={schema}>   
                            <SignupForm
                                onSubmit={this.handleSignup}
                                onChange={this.handleFieldChange}
                                errors={validationErrors}
                                isLoading={isLoading}
                                isValid={this.isFormValid()}
                            />        
                        </Validator>                
                    </Grid.Column>
                </Grid>
            </div>
        );
    }    
}

export default animateTransition(150)(SignUp);
