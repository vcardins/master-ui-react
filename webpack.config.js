const path = require('path');
const loaders = require('./webpack/loaders');
const plugins = require('./webpack/plugins');
const settings = require('./webpack/settings');
const concat = require('lodash/concat');

process.env.REACT_WEBPACK_ENV = settings.isDevelopment() ? 'dev' : 'dist';

const _path = (dir) => path.resolve(__dirname, `${settings.srcFolder}/${dir}/`)

let webpackConfig = {
    devtool: settings.isDevelopment() 
        ? 'eval-source-map' 
        : 'source-map',
    target: settings.target,
    entry: {
        // Add the react hot loader entry point - in reality, you only want this in your dev Webpack settings
        client: settings.isDevelopment()
            ? [
                'react-hot-loader/patch',
                'webpack-hot-middleware/client',
                'webpack/hot/only-dev-server',
                './src/index.tsx',
              ]
            : './src/index.tsx',  
    },
    output: {
        path: settings.outputPath,
        filename: settings.isDevelopment() 
            ? '[name].js' 
            : '[name].[chunkhash:8].js',
        publicPath: '/',
    },
    performance: {
        hints: settings.isProduction() ? 'warning' : false,
    },
    resolve: 
    {
        //root: path.resolve('./src'),
        extensions: settings.extensions,
        // Fix webpack's default behavior to not load packages with jsnext:main module
        // https://github.com/Microsoft/TypeScript/issues/11677 
        mainFields: ['main'],
        alias: {
            components: _path('components'),            
            config: _path('config'),
            core: _path('core'),
            containers: _path('containers'),
            routes: _path('routes'),
            reducers: _path('reducers'),
            styles: _path('styles'),
            widgets: _path('widgets'),
            variables: _path('styles//vars.scss'),
        },
        modules: [
            // places where to search for required modules
            settings.cwd('src'),
            settings.cwd('node_modules'),
            settings.cwd('./'),
        ],
    },
    module: {
        loaders: concat(
            loaders.typescript,
            loaders.javascript,
            loaders.files,
            loaders.svg,
            loaders.json,
            loaders.styles
        ),
    },
    plugins,    
    node: {
        console: true,
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
    },    
    stats: settings.isDevelopment() ? {} : 
    {
        // Add children information
        children: false,
        // Add chunk information (setting this to `false` allows for a less verbose output)
        chunks: false,
        // Add built modules information to chunk information
        chunkModules: false,
        chunkOrigins: false,
        modules: false,
    },
    // In case React libs are being loaded from a CDN or external source, don't bundle
    // externals: settings.isDevelopment() ? '' : 
    // {
    //     react: 'React',
    //     'react-dom': 'ReactDOM',
    // },
}

if (settings.isProduction()) {
    webpackConfig = Object.assign({}, webpackConfig);
}

module.exports = webpackConfig;