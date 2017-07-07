import Notebook from './containers';
export default {
  name: 'Notebook',
  title: 'Notebook',
  description: 'My Notebook',
  path: '/notebook',
  component: Notebook,
  getChildRoutes: (location, next) => {
	const subRoutes = [
		{
			path: '', // this path is empty
			indexRoute: {
				component: Notebook,
			},
			childRoutes: [
				{
					path: ':id', 
					component: Notebook,
				},
			],
		},
	];
	next(null, subRoutes);
  },
};
