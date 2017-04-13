import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import ResetPasswordForm from '../components/ResetPasswordForm';
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
    email: string;
    validationErrors: Array<ValidationError>;
}

// @animateTransition()
class ResetPasswordContainer extends React.Component<Props, State>  {

    state: State = { 
        isLoading: false, 
        email: '', 
        validationErrors: [], 
    };

    constructor(props: Props) {
        super(props);
        this.handleResetPassword = this.handleResetPassword.bind(this); 
        this.handleFieldChange = this.handleFieldChange.bind(this);   
    }

    handleFieldChange = (event: any): void => {
        event.preventDefault();
        const { name, value } = event.target;
        const state = Object.assign({}, {}, this.state);
        state[name] = value;
        this.setState(state);
    }

    handleResetPassword (event): void {
        event.preventDefault();
        const { email } = this.state;

        this.setState({ isLoading: true });
        UserAuth.resetPassword(email)
            .then((response: ActionResult) => {
                this.setState({ isLoading: false });
                if (response.redirect) {
                    browserHistory.replace(response.redirect);
                }                   
            })
            .catch((response: ActionResult) => {
                const validationErrors = [].concat(new ValidationError(response.error.message, '', 'email'));
                this.setState({ isLoading: false, validationErrors });    
            });
    }

    isFormValid(): boolean {
        const { email = '' } = this.state;
        return email.length > 0;
    }

    render(): JSX.Element {
        const { children } = this.props;
        const { isLoading, validationErrors } = this.state;

        return (
            <div id="page-resetpassword" className="page-account">
                <Grid centered verticalAlign="middle" >
                    <Grid.Column>
                        <ResetPasswordForm
                            onSubmit={this.handleResetPassword}
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

export default animateTransition(150)(ResetPasswordContainer);
