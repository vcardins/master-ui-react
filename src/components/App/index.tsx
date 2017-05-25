import App from './App';
import INodeRequireUpdated from 'core/interfaces/INodeRequireUpdated';

export default {
  getComponent (nextState: any, next: any) {
    const updatedRequire = require as INodeRequireUpdated;
    updatedRequire.ensure(['./App'], (require: any) => {
      /*  These modules are lazily evaluated using require hook, and
      will not be loaded until the router invokes this callback. */
      const App = require('./App').default;
      next(null, App);
    });
  },  
};
