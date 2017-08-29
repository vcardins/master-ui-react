import * as React from 'react';

class Public extends React.Component<{}, {}> {

	constructor() {
		super();
	}

	async componentDidMount() {
		const loader = document.getElementById('loader') as HTMLElement;
		if (loader) {
			loader.style.opacity = '0';
			setTimeout(() => loader.remove(), 500);
		}
	}

	render(): JSX.Element {
		return <div>{ this.props.children }</div>;
	}
	
}
						
export default Public;
