import INodeRequireUpdated from 'core/interfaces/INodeRequireUpdated';

// We only need to import the modules necessary for initial render
const createRoutes = () => {
	/*  Note: Instead of using JSX, we are using react-router PlainRoute,
		a simple javascript object to provide route definitions.  */
	
	return {
		path: '/',
		getChildRoutes (location: any, next: any) {
			const updatedRequire = require as INodeRequireUpdated;
			updatedRequire.ensure([], (require: any): void => {
				
				const protectedRoutes = Object.assign({}, require('components/App').default, {
					getChildRoutes: (location: any, next: any) => {
						require.ensure([], (require: any) => {
							next(null, [
								// Provide store for async reducers and middleware
								require('./Dashboard').default,
								require('./Countries').default,
								require('./Report').default,
								require('./Provinces').default,  
								require('./Notebook').default,  
								require('./Account/UserProfile').default,
							]);
						});
					},
					getIndexRoute(nextState: any, next: any): void {
						require.ensure(['routes/Dashboard'], (require: any) => {
								const View = require('routes/Dashboard').default; 
								next(null, View);
						});
					},   
				});

				const publicRoutes = Object.assign({}, require('components/Public').default, {
					getChildRoutes: (location: any, next: any) => {
						require.ensure([], (require: any) => {
							next(null, [
								// Provide store for async reducers and middleware
								require('./Home').default,
								require('./Account/Login').default,
								require('./Account/Signup').default,
								require('./Account/ResetPassword').default,
							]);
						});
					},
				});

				next(null, [publicRoutes, protectedRoutes]);
				
			});
		},
	};
};

export default createRoutes();
