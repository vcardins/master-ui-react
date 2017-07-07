import * as React from 'react';
import { Router, browserHistory } from 'react-router';
import routes from './routes';

export default class Root extends React.Component<any, any> {
	render() {
		return <Router routes={routes} history={browserHistory} />;
	}
}
