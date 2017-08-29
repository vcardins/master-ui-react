import * as React from 'react';
import { DOM } from 'core/helpers';

export default function animateTransitionFactoryFactory(delay: number = 500) {
  return function animateTransition<Props, State>(
	  WrappedComponent: { new(...args : any[]): React.Component<Props, State> } ) {
	  return class AnimateTransition extends React.Component<Props, State> {
		  
		  componentDidMount() {
			DOM.animateElement(this, null, delay);		   
		  }

		  render(): JSX.Element {
			  return <WrappedComponent {...this.props} {...this.state}/>;
		  }
	  };
  };
}
