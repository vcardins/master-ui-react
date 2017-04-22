import * as _ from 'lodash';
  
let configBase = {
	title: 'Master UI',
	description: 'Master UI',
	name: 'master-ui',
	defaultRoute: '/',
	version: '0.0.1',
	tokenPrefix: 'masterui',
	analyticsId: '',
	api : {
		url: '/',
		clientId: '045A23D0-3859-42F1-A9CF-AE688EA0F030',
		loginUrl: 'token',
		resetPasswordUrl: 'PasswordReset',
		prefix: 'api',
		clientSecret: '#$%ˆ&**()*()*)_)',
	},
};

let configForDevelopment = {
	api : { url: 'http://immiplanner.azurewebsites.net' },
	signalR : { host: 'http://immiplanner.azurewebsites.net', logging : true },
	isInDebugMode: true,
	providers: {
		google: {
			clientId: '432486336848-earrujhbo5vb519kms0j65cpcaf9tdgc.apps.googleusercontent.com',
			secret: 'fbXnqVE8WXLrKMFxQaGgiloW',
		}
		,
		linkedin: {
			clientId: '778mif8zyqbei7',
		},
		facebook: {
			clientId: '1452782111708498',
		},
	},
};

let configForProduction = {
	api : { url: 'http://localhost:9999/' },
	signalR : { host: 'http://localhost:1340', logging : false },
	isInDebugMode: false,
	providers: {
		google: {
			clientId: '239531826023-3ludu3934rmcra3oqscc1gid3l9o497i.apps.googleusercontent.com',
		}
		,
		linkedin: {
			clientId: '7561959vdub4x1',
		},
		facebook: {
			clientId: '1653908914832509',
		},

	},
};

let configEnv = (window.location.hostname === 'localhost' ? configForDevelopment : configForProduction);
const config: any = _.merge(configBase, configEnv);

export { config as default };
