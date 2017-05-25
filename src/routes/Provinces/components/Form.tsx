import * as React from 'react';
import { Form, Button } from 'semantic-ui-react';
import ContentPane from 'components/ContentPane';
import Province from '../models/Province';
import { FormValidationError } from 'core/models';
import '../index.scss';

interface Props extends React.HTMLProps<HTMLDivElement> {
    model: Province;
    onSubmit: (event: any) => void;
    onChange: (event: any) => void;
    errors: Array<FormValidationError>;
    isSaving: boolean;
    isValid: boolean;
}

const ProvinceForm: React.StatelessComponent<Props> = (props: Props): JSX.Element => {
    let componentRef;
    const {
        model,
        onSubmit,
        onChange,
        errors,
        isSaving,
        isValid,
    } = props;

    const ActionButtons = () => (
        <Button.Group labeled basic size="small" floated="right" compact className="borderless">
            <Button icon="delete" content="Delete" />
            <Button icon="save" content="Save" disabled={!isValid || isSaving}/>
        </Button.Group>
    );
    
    return (    
        <ContentPane toolbar={<ActionButtons/>} className="padded">
            <Form className={ isSaving ? 'loading' : ''} onSubmit={onSubmit} >
                <Form.Field name="iso2" label="Iso 2" value={ model.iso2 } control="input" onChange={onChange} readOnly />
                <Form.Field name="code" label="Code" value={ model.code } control="input" onChange={onChange} readOnly />
                <Form.Field name="name" label="Name" value={ model.name } control="input" onChange={onChange} readOnly />
            </Form>
            {/*{ renderErrors(errors) }*/}                
        </ContentPane>
    );
};

export default ProvinceForm;
