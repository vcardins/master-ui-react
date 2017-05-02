const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const FriendlyErrors = require('friendly-errors-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const ProgressPlugin = require('webpack/lib/ProgressPlugin')
const LogPlugin = require('./log-plugin')
// https://medium.com/@adamrackis/vendor-and-code-splitting-in-webpack-2-6376358f1923
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const settings = require('./settings');

const sourceMap = settings.isTest() || settings.isProduction() 
  ? [new webpack.SourceMapDevToolPlugin({ filename: null, test: /\.tsx?$/ })]
  : [];

const basePlugins = [
    new HtmlWebpackPlugin({
        title: settings.title,
        template: settings.template,
        filename: settings.bundleOutputPath,
        minify: {
            collapseWhitespace: settings.isProduction(),
            removeComments: settings.isProduction(),
            removeRedundantAttributes: settings.isProduction(),
            removeScriptTypeAttributes: settings.isProduction(),
            removeStyleLinkTypeAttributes: settings.isProduction(),
        },
    }),
    
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),

    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        },
    }),    
    new webpack.LoaderOptionsPlugin(settings.loadersOptions()),
    new CopyWebpackPlugin([
        {
            from: settings.cwd(settings.staticFolder),
            // to the root of dist path
            to: './',
        },
    ]),    
    new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: (module) => {
            // this assumes your vendor imports exist in the node_modules directory
            return module.context && module.context.indexOf('node_modules') !== -1;
        },
    }),

    //catch all - anything used in more than one place
    new webpack.optimize.CommonsChunkPlugin({
        async: 'main.js',
        minChunks(module) {
            const context = module.context;
            const targets = ['react', 'react-dom', 'react-router', 'lodash']
            return context && context.indexOf('node_modules') >= 0 && targets.find((t) => new RegExp(`\\\\${t}\\\\`, 'i').test(context));
        },
    }),
    
    // CommonChunksPlugin will now extract all the common modules from vendor and main bundles
    new webpack.optimize.CommonsChunkPlugin({ 
        name: 'manifest', //But since there are no more common modules between them we end up with just the runtime code included in the manifest file
    }),    
    new LogPlugin(settings.port),
].concat(sourceMap);

const devPlugins = [
    new StyleLintPlugin({
        configFile: './.stylelintrc',
        files: ['src/**/*.scss'],
        failOnError: false,
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new FriendlyErrors(),   
];

const prodPlugins = [
    new ProgressPlugin(),
    new ExtractTextPlugin({
        filename: 'styles.[contenthash:8].css', 
        allChunks: true,
    }),
    new webpack.optimize.UglifyJsPlugin({
        sourceMap: false,
        compress: {
            warnings: false,
            conditionals: true,
            unused: true,
            comparisons: true,
            sequences: true,
            dead_code: true, // eslint-disable-line camelcase
            evaluate: true,
            if_return: true, // eslint-disable-line camelcase
            join_vars: true, // eslint-disable-line camelcase
            drop_console: true, // eslint-disable-line camelcase
            drop_debugger: true, // eslint-disable-line camelcase
            global_defs: { // eslint-disable-line camelcase
                __REACT_HOT_LOADER__: undefined, // eslint-disable-line no-undefined
            },
        },
        minimize: true,
        debug: false,
        output: {
            comments: false,
        },
    }),
    // Included by default in webpack 2
    new webpack.optimize.AggressiveMergingPlugin(),
    new BundleAnalyzerPlugin({
        analyzerMode: 'static',
    }),
    // extract vendor chunks
    // new webpack.optimize.CommonsChunkPlugin({
    //     name: 'vendor',
    //     filename: 'vendor.[hash:8].js',
    // }),    
];

const plugins = basePlugins
  .concat(settings.isProduction() ? prodPlugins : [])
  .concat(settings.isDevelopment() ? devPlugins : []);

module.exports = plugins;