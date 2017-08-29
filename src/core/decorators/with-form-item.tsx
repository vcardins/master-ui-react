// decorators/with-form-Field.tsx
import * as React from 'react';
import { Form } from 'semantic-ui-react';

interface DecoratorProps {
  label?: string;
  className?: string;
//   labelCol?: typeof FormField.prototype.props.labelCol;
//   wrapperCol?: typeof FormField.prototype.props.wrapperCol;
  hasFeedback?: boolean;
}

export default function withFormField<Props>(
  WrappedComponent: React.StatelessComponent<Props>,
) {
  const Decorator: React.StatelessComponent<DecoratorProps & Props> = (props) => {
	return (
	  <Form.Field
		label={props.label}
		hasFeedback={props.hasFeedback}
	  >
		<WrappedComponent {...props} />
	  </Form.Field>
	);
  };
  return Decorator;
}

{/*labelCol={props.labelCol}
wrapperCol={props.wrapperCol}*/}
