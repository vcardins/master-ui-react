import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
// application styles
import 'styles/index.scss';
// also, semantic already has normalize.css 3.0.1 (I'm not sure)
import 'semantic-ui-css/semantic.css';

const ROOT_NODE = 'app';
const ROOT_ELEMENT = document.getElementById(ROOT_NODE);

const renderError = (error) => {
    const RedBox = require('redbox-react');
    ReactDOM.render(<RedBox error={error}/>, ROOT_ELEMENT)
}

const render = (key = null) => {
    const children = require('./routes/index').default(); 
    const App = (
        <Router routes={children} history={browserHistory} key={key} />
    )
    document.addEventListener('DOMContentLoaded', () => {
        ReactDOM.render(App, ROOT_ELEMENT);
    });
}

// Enable HMR and catch runtime errors in RedBox
// This code is excluded from production bundle
if (module.hot) { 
    module.hot.accept('./layouts/App', () => {
        try {
            render(Math.random());
        } 
        catch (error) {
            renderError(error);
        }        
    });
}

render();