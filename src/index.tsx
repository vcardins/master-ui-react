import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { AppContainer } from 'react-hot-loader';
import routes from './routes';
// application styles
import 'styles/index.scss';
// also, semantic already has normalize.css 3.0.1 (I'm not sure)
import 'semantic-ui-css/semantic.css';

const ROOT_NODE = 'app';
const ROOT_ELEMENT = document.getElementById(ROOT_NODE);

const renderError = (error) => {
    const RedBox = require('redbox-react');
    ReactDOM.render(<RedBox error={error}/>, ROOT_ELEMENT);
};

const render = (children) => {
    const App = (
        <AppContainer>
            <Router routes={children} history={browserHistory} />
        </AppContainer>
    );
    document.addEventListener('DOMContentLoaded', () => {
        ReactDOM.render(App, ROOT_ELEMENT);
    });
};

// Enable HMR and catch runtime errors in RedBox
// This code is excluded from production bundle
const hotModule = module as NodeModuleHot;
if (hotModule.hot) { 
    hotModule.hot.accept('./routes', () => {
        const newRoutes = require('./routes').default;
        try {
            render(newRoutes);
        } catch (error) {
            renderError(error);
        }        
    });
}

render(routes);
