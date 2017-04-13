import * as React from 'react';
import { Component } from 'react';

export default function HOCBaseRender<Props, State, ComponentState>(
    Comp: new() => Component<Props & State, ComponentState>) {
    return class HOCBase extends Component<Props, State> {
        render() {
            return <Comp {...this.props} {...this.state}/>;
        }
    };
}

// export default function Validator <Props, State, CompState> (
//     WrappedComponent: React.ComponentClass<Props & State>,
// ): React.ComponentClass<Props & State> {
//     const Decorator =  class extends React.Component<Props & State, CompState> {              
//         render() {
//             console.log(this.state);
//             return <WrappedComponent {...this.props} {...this.state} />;
//         }
//     };
//     return Decorator;
// }
