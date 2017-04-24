const path = require('path');
const loaders = require('./webpack/loaders');
const plugins = require('./webpack/plugins');
const config = require('./webpack/utils');
const concat = require('lodash/concat');
// const _debug = require('debug');
// const debug = _debug('app:webpack:config');

process.env.REACT_WEBPACK_ENV = config.isDevelopment() ? 'dev' : 'dist';

const _path = (dir) => path.resolve(__dirname, `${config.srcFolder}/${dir}/`)

let webpackConfig = {
    entry: {
        // Add the react hot loader entry point - in reality, you only want this in your dev Webpack config
        client: [
            'react-hot-loader/patch',
            'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
            'webpack/hot/only-dev-server',
            './src/index.jsx',
        ],
    },
    devtool: config.isDevelopment() 
        ? 'eval-source-map' 
        : 'source-map',
    target: config.target,
    output: {
        path: config.outputPath,
        filename: config.isDevelopment() 
            ? '[name].js' 
            : '[name].[chunkhash:8].js',
        publicPath: config.publicPath,
    },
    performance: {
        hints: config.isProduction() ? 'warning' : false,
    },
    resolve: {
        //root: path.resolve('./src'),
        extensions: config.extensions,
        // Fix webpack's default behavior to not load packages with jsnext:main module
        // https://github.com/Microsoft/TypeScript/issues/11677 
        mainFields: ['main'],
        alias: {
            components: _path('components'),            
            config: _path('config'),
            core: _path('core'),
            containers: _path('containers'),
            layouts: _path('layouts'),
            routes: _path('routes'),
            reducers: _path('reducers'),
            styles: _path('styles'),
            widgets: _path('widgets'),
            variables: _path('styles//vars.scss'),
        },
        modules: [
            // places where to search for required modules
            config.cwd('src'),
            config.cwd('node_modules'),
            config.cwd('./'),
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
    stats: config.isDevelopment() 
        ? {} 
        : {
            // Add children information
            children: false,
            // Add chunk information (setting this to `false` allows for a less verbose output)
            chunks: false,
            // Add built modules information to chunk information
            chunkModules: false,
            chunkOrigins: false,
            modules: false,
        },
}

if (config.isProduction()) {
    webpackConfig = Object.assign({}, webpackConfig, config.vendors);
}

module.exports = webpackConfig;