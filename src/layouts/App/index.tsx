import App from './App';

export default {
  getComponent (nextState: any, next: any) {
    require.ensure(['./App'], (require: any) => {
      /*  These modules are lazily evaluated using require hook, and
      will not be loaded until the router invokes this callback. */
      const App = require('./App').default;
      next(null, App);
    });
  },  
};
