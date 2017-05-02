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
const ResetPasswordForm: React.StatelessComponent<Props> = (props: Props): JSX.Element => {
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
                    Reset Password
                </Header.Content>
            </Header>
            <Form className={ isLoading ? 'loading' : ''} onSubmit={onSubmit}>
                <Form.Field>
                    <Form.Input name="email" placeholder="Email" onChange={onChange} />
                </Form.Field>
                <Button type="submit" className="ui fluid large submit button" disabled={!isValid || isLoading}>
                    Reset Password
                </Button>
            </Form>
            <Message>
                <p>Already have an account? <Link to={'/login'}>Login to your account</Link>.</p>
            </Message>
        </Segment>                                    
    );
};

export default ResetPasswordForm;
