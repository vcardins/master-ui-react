import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Router } from 'react-router';
// application styles
import 'styles/index.scss';
// also, semantic already has normalize.css 3.0.1 (I'm not sure)
import 'semantic-ui-css/semantic.css';

import { browserHistory } from 'react-router';

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
if (module.hot) { //__DEV__ && 
    module.hot.accept('./layouts/App', () => {
        try {
            render(Math.random());
        } 
        catch (error) {
            renderError(error);
        }        
    });
    // module.hot.accept(['./reducers'], () => {
    //     try {
    //         const nextRootReducer = require('./reducers/index');
    //         store.replaceReducer(nextRootReducer);
    //         render(Math.random());
    //     } 
    //     catch (error) {
    //         renderError(error);
    //     }
    // })
}

render();
// Use Redux DevTools chrome extension
//if (__DEBUG__) {
//if (window.devToolsExtension) window.devToolsExtension.open();
//}