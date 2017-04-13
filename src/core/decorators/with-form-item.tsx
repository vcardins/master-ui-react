// decorators/with-form-Field.tsx
import * as React from 'react';
import { Form } from 'semantic-ui-react';
const FormField = Form.Field;

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
      <FormField
        label={props.label}
        hasFeedback={props.hasFeedback}
      >
        <WrappedComponent {...props} />
      </FormField>
    );
  };
  return Decorator;
}

{/*labelCol={props.labelCol}
wrapperCol={props.wrapperCol}*/}
