import * as React from 'react';
import { Form, Button } from 'semantic-ui-react';
import ContentPane from 'components/ContentPane';
import Notebook from '../models/Notebook';
import { FormValidationError } from 'core/models';
import '../index.scss';

interface Props extends React.HTMLProps<HTMLDivElement> {
	model: Notebook;
	onSubmit: (event: any) => void;
	onChange: (event: any) => void;
	errors: Array<FormValidationError>;
	isSaving: boolean;
	isValid: boolean;
}

const NotebookForm: React.StatelessComponent<Props> = (props: Props): JSX.Element => {
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
				<Form.Field name="iso2" label="Title" value={ model.title } control="input" onChange={onChange} />
				<Form.TextArea name="description" label="Description" value={ model.description } control="input" onChange={onChange} />
				<Form.Field name="meta" label="Meta" value={ model.meta || ''} control="input" onChange={onChange} />
				<Form.Checkbox name="starred" label="Starred" checked={ model.starred } onChange={onChange} />
			</Form>
			{/*{ renderErrors(errors) }*/}				
		</ContentPane>
	);
};

export default NotebookForm;
