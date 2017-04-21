import INodeRequireUpdated from 'core/interfaces/INodeRequireUpdated';

// We only need to import the modules necessary for initial render
export const createRoutes = () => {
/*  Note: Instead of using JSX, we are using react-router PlainRoute,
    a simple javascript object to provide route definitions.  */
  
  const routes = {
    path: '/',
    getChildRoutes (location: any, next: any) {
      const updatedRequire = require as INodeRequireUpdated;
      updatedRequire.ensure(['layouts/App'], (require: any): void => {
        
        const workspace = require('layouts/App').default;
        const protectedRoutes = Object.assign({}, workspace, {
          getChildRoutes: (location: any, next: any) => {
            require.ensure([], (require: any) => {
              next(null, [
                // Provide store for async reducers and middleware
                require('./Dashboard').default,
                require('./Countries').default,
                require('./Report').default,
                require('./Provinces').default,  
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
             
        const publicRoutes = [
          require('./Home').default,
          require('./Account/Login').default,
          require('./Account/Signup').default,
          require('./Account/ResetPassword').default,
        ];

        // <Redirect from="/*" to="/" />
        const routes = publicRoutes.concat(protectedRoutes);

        next(null, routes);
      });
    },
  };

  return routes;
};

export default createRoutes;
