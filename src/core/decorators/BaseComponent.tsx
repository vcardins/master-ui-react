import { Component } from 'react';
import { isEqual } from 'lodash';

interface Props {}

interface State {}

/* eslint no-return-assign: 0 */
function defaultResolver({target: value}) {
	return value;
}

class BaseComponent<P extends Props, S extends State> extends Component<P, S> {
	constructor() {
		super();
		this.bindMethodsToThis();
	}

	shouldComponentUpdate(nextProps, nextState) {
	  return (!isEqual(this.props, nextProps) || !isEqual(this.state, nextState));
	}

	_bindedHandlers() {}

	getMethodNames() {
		const excludes: string[] = [
			'constructor',
			'componentWillMount',
			'render',
			'componentDidMount',
			'componentWillReceiveProps',
			'shouldComponentUpdate',
			'componentWillUpdate',
			'componentDidUpdate',
			'componentWillUnmount',
			'bindMethodsToThis',
		];
		const props: string[] = Object.getOwnPropertyNames(this.constructor.prototype);
		const names = [];
		for (let p of props) {		  
			const p2 = this[p];
			if (typeof p2 === 'function' && excludes.indexOf(p) === -1) {
				names.push(p);
			}
		}
		return names;
	}

	bindMethodsToThis() {
		const methods = this.getMethodNames();
		methods.forEach((item) => this[item] = this[item].bind(this));
	}

	bindToState (key, resolver) {
		if (!this._bindedHandlers[key]) {
			resolver = (resolver || defaultResolver).bind(this);
			this._bindedHandlers[key] = (function (e) {
				const newState = {};
				newState[key] = resolver(e);
				this.setState(newState);
			}).bind(this);
		}
		return this._bindedHandlers[key];
	}   
}

export default BaseComponent;
