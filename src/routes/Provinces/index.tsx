import Province from './containers';
export default {
  name: 'Province',
  title: 'Province',
  description: 'Country Province',
  path: '/provinces',
  component: Province,
  getChildRoutes: (location, next) => {
    const subRoutes = [
        {
            path: '', // this path is empty
            indexRoute: {
                component: Province,
            },
            childRoutes: [
                {
                    path: ':id', 
                    component: Province,
                },
            ],
        },
    ];
    next(null, subRoutes);
  },
};
