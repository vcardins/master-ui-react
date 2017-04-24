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
