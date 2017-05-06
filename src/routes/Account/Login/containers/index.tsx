import * as React from 'react';
import { browserHistory } from 'react-router';
import LoginForm from '../components/LoginForm';
import { ActionResult, ValidationError } from 'core/models';
import { UserAuth } from 'core/auth';
import { animateTransition } from 'core/decorators';
import { Grid, Segment, Message, Header, Icon } from 'semantic-ui-react';

interface Props {
    children: JSX.Element;
    router: any;    
}

interface State {
    isLoading: boolean;
    username: string;
    password: string;
    validationErrors: Array<ValidationError>;
}

class LoginContainer extends React.Component<Props, State>  {

    state: State = { 
        isLoading: false, 
        username: '', 
        password: '', 
        validationErrors: [], 
    };

    constructor(props: Props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this); 
        this.handleFieldChange = this.handleFieldChange.bind(this);   
    }

    handleFieldChange = (event: any): void => {
        event.preventDefault();
        const { name, value } = event.target;
        const state = Object.assign({}, {}, this.state);
        state[name] = value;
        this.setState(state);
    }

    async handleLogin (event) {
        event.preventDefault();
        const { username, password } = this.state;

        this.setState({ isLoading: true });
        const response = await UserAuth.login(username, password);
        if (response.error) {
            const validationErrors = [].concat(new ValidationError(response.error.message, '', 'username'));
            this.setState({ isLoading: false, validationErrors });    
        } else {
            this.setState({ isLoading: false });
            if (response.redirect) {
                browserHistory.replace(response.redirect);
            }
        }
    }

    isFormValid(): boolean {
        const { username = '', password = '' } = this.state;
        return username.length > 0 && password.length > 0;
    }

    render(): JSX.Element {
        const { children } = this.props;
        const { isLoading, validationErrors } = this.state;

        return (
            <div id="page-login" className="page-account">
                <Grid centered verticalAlign="middle">
                    <Grid.Column>
                        <LoginForm
                            onSubmit={this.handleLogin}
                            onChange={this.handleFieldChange}
                            errors={validationErrors}
                            isLoading={isLoading}
                            isValid={this.isFormValid()}
                        />
                    </Grid.Column>
                </Grid>
            </div>
        );
    }    
}

export default animateTransition(150)(LoginContainer);
