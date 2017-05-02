import * as React from 'react';
import { Link } from 'react-router';
import { ValidationError } from 'core/models';

import { Grid, Segment, Message, Header, Icon, Form, Checkbox, Button } from 'semantic-ui-react';
import '../index.scss';

interface Props extends React.HTMLProps<HTMLDivElement> {
    onSubmit: (event: any) => void;
    onChange: (event: any) => void;
    errors: Array<ValidationError>;
    isLoading: boolean;
    isValid: boolean;
}

const renderErrors = (errors: Array<ValidationError>) => {
    if (errors.length === 0) {
        return null;
    }
    return (
        <Message
            error
            header="There was some errors with your submission"
            list={errors.map(({message}) => message)}
        />
    );
};

const LoginForm: React.StatelessComponent<Props> = (props: Props): JSX.Element => {
    const {
        onSubmit,
        onChange,
        errors,
        isLoading,
        isValid,
    } = props;

    return (
        <Segment stacked>
            <Header as="h2" >
                <Icon name="id card" />
                <Header.Content>
                    Log-in to your account
                </Header.Content>
            </Header>
            <Form className={ isLoading ? 'loading' : ''} onSubmit={onSubmit}>
                <Form.Field>
                    <Form.Input name="username" placeholder="Username" onChange={onChange} />
                </Form.Field>
                <Form.Field>
                    <Form.Input type="password" name="password" placeholder="Password" onChange={onChange}/>
                </Form.Field>
                <Form.Field>
                    <Checkbox name="rememberMe" label="Remember Me" />
                </Form.Field>
                <Button type="submit" className="ui fluid large submit button" disabled={!isValid || isLoading}>
                    Submit
                </Button>
            </Form>
            { renderErrors(errors) }
            <Message>
                <p>Don't have an account? <Link to={'/signup'}>Create one</Link>.</p>
                <p>Don't remember your password? <Link to={'/reset-password'}>Reset you password</Link>.</p>
            </Message>
        </Segment>                                    
    );
};

export default LoginForm;
