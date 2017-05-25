import Public from './Public';
import INodeRequireUpdated from 'core/interfaces/INodeRequireUpdated';

export default {
	getComponent (nextState: any, next: any) {
		const updatedRequire = require as INodeRequireUpdated;
		updatedRequire.ensure(['./Public'], (require: any) => {
			/*  These modules are lazily evaluated using require hook, and
			will not be loaded until the router invokes this callback. */
			next(null, require('./Public').default);
		});
	},  
};
