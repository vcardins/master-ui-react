import * as React from 'react';
import * as ReactDOM from 'react-dom';

interface IProps {
  children: JSX.Element;
  property: string;
}
interface IState {
  containerId: string;
}
interface Node {
	getAttribute(attr: string): string;
}


class ContainerIdDetector extends React.Component<IProps, IState> {
  constructor() {
	super();
	this.state = { containerId: '' };
  }

  componentDidMount() {
	const parentNode = ReactDOM.findDOMNode(this).parentNode as Element;
	this.setState({
	  containerId: parentNode.getAttribute('id'),
	});
  }

  render() {
	const { children } = this.props;
	const { containerId } = this.state;

	if (!containerId) {
	  return <span />;
	} else {
	  return React.cloneElement(
		children, { containerId },
	  );
	}
  }
}
