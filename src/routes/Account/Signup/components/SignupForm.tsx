import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Link } from 'react-router';
import { FormValidationError } from 'core/models';
import { Grid, Segment, Message, Header, Icon, Form, Checkbox, Button } from 'semantic-ui-react';
import '../index.scss';

interface Props extends React.HTMLProps<HTMLDivElement> {
    onSubmit: (event: any) => void;
    onChange: (event: any) => void;
    errors: Array<FormValidationError>;
    isLoading: boolean;
    isValid: boolean;
}

const renderErrors = (errors: Array<FormValidationError>) => {
    if (errors.length === 0) {
        return null;
    }
    // list={errors.map(({message}) => message)}
    return (
        <Message
            error
            header="There was some errors with your submission"            
        />
    );
};

const SignupForm: React.StatelessComponent<Props> = (props: Props): JSX.Element => {
    const {
        onSubmit,
        onChange,
        errors,
        isLoading,
        isValid,
    } = props;

    return (
        <Segment stacked>
            <Header as="h2">
                <Icon name="id card" />
                <Header.Content>
                    Create your account
                </Header.Content>
            </Header>
            <Form className={ isLoading ? 'loading' : ''} onSubmit={onSubmit}>
                <Form.Field>
                    <Form.Input name="username" placeholder="Username" onChange={onChange} />
                </Form.Field>
                <Form.Field>
                    <Form.Input name="email" placeholder="Email" onChange={onChange} />
                </Form.Field>
                <Form.Group widths="equal">
                    <Form.Input name="firstName" placeholder="First Name" onChange={onChange} />
                    <Form.Input name="lastName" placeholder="Last Name" onChange={onChange} />
                </Form.Group>
                <Form.Group widths="equal">
                    <Form.Input type="password" name="password" placeholder="Password" onChange={onChange}/>
                    <Form.Input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={onChange}/>
                </Form.Group>
                <Form.Field>
                    <Form.Checkbox name="terms" label="I read and accept terms" onChange={onChange}/>
                </Form.Field>
                <Button type="submit" className="ui fluid large teal submit button" disabled={!isValid || isLoading}>
                    Register
                </Button>
            </Form>
            { renderErrors(errors) }
            <Message>
                <p>Already have an account? <Link to={'/login'}>Login to your account</Link>.</p>
            </Message>
        </Segment>                                    
    );
};

export default SignupForm;
