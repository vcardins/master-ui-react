import * as React from 'react';

export default function SimpleComponentWrap<P>(
  name: string, Comp: React.ComponentClass<P> | React.StatelessComponent<P>,
): React.ComponentClass<P> {
  return class WrappedComponent extends React.Component<P, {}> {
    render() {
      return <Comp {...this.props} />;
    }
  };
}
