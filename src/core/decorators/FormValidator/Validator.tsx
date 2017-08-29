import * as React from 'react';
import * as Ajv from 'ajv';
import { autobind } from 'core-decorators';

interface Props {
  schema: any;
  children?: any;
}

interface State {
  validator: any;
}

interface Param {
  missingProperty: any;
}

interface Err {
  params: Param;
}

function errorToProperty(err: Err) {
  const { params = { missingProperty: null } } = err;

  return (params.missingProperty) 
	? params.missingProperty
	: undefined;
}

export default class Validator extends React.Component<Props, State> {

  schema: any;
  children: React.ReactNode;
  ajv: Ajv.Ajv;

  state: State = { 
	validator: {}, 
  };

  constructor(props: Props, context) {
	super(props, context);
	console.log(props, context);

	this.state = {
	  ...this.getStateFromProps(props),
	};
  }

  componentWillReceiveProps(props: Props) {
	this.setState(this.getStateFromProps(props));
  }

  getStateFromProps(props): State {
	const { schema } = props;
	const validator: Ajv.Ajv = null;

	if (!schema) {
	  return {
		validator,
	  };
	}
		
	const currentValidator = this.state && this.state.validator;
	if (!currentValidator || currentValidator.schema !== schema) {
	  const ajv = this.ajv = this.ajv || Ajv({
		allErrors: true,
	  });

	  const validator = ajv.compile(schema);

	  validator.schema = schema;
	}
  
	return {
	  validator,
	};

  }

  @autobind
  async validate(value) {
	const { validator } = this.state;
	if (!validator) {
	  return [];
	}

	const valid = validator(value);
	if (valid) {
	  return [];
	}

	const { errors } = validator;

	return errors.map((err) => {
	  const prop = errorToProperty(err);
	  const path = err.dataPath ? err.dataPath.substr(1) : null;

	  const fullPath = path && prop
		? `${path}.${prop}`
		: path || prop;

	  return {
		...err,
		path: fullPath,
	  };
	});
  }

  render(): JSX.Element {
	const { children } = this.props;
	if (!children) {
	  return children;
	}

	return React.cloneElement(children, {
	  validate: this.validate,
	});
  }
}

// export default class Validator<Props, State> extends Component(
//   WrappedComponent: React.Component<Props, State>,
// ) {
//   // static propTypes = {
//   //   schema: any,
//   //   children: JSX.Element,
//   // };
  
  
//   const Decorator: React.Component<DecoratorProps & Props> = (props) => {
// 	 return (
// 	   /*<FormField
// 		 label={props.label}
// 		 hasFeedback={props.hasFeedback}
// 	   >
// 		 <WrappedComponent {...props} />
// 	   </FormField>*/
// 	 );
//   };
//   return Decorator;
// }
