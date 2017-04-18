const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const SplitByPathPlugin = require('webpack-split-by-path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const FriendlyErrors = require('friendly-errors-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const ProgressPlugin = require('webpack/lib/ProgressPlugin')
const LogPlugin = require('./log-plugin')

const settings = require('./utils');

const sourceMap = settings.isTest() || settings.isProduction() 
  ? [new webpack.SourceMapDevToolPlugin({ filename: null, test: /\.tsx?$/ })]
  : [];

const basePlugins = [
    new HtmlWebpackPlugin({
        title: settings.title,
        template: settings.template,
        filename: settings.bundleOutputPath,
        minify: settings.isProduction(),
    }),
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
    new LogPlugin(settings.port),
].concat(sourceMap);

const devPlugins = [
    new StyleLintPlugin({
        configFile: './.stylelintrc',
        files: ['src/**/*.scss'],
        failOnError: false,
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new FriendlyErrors(),
];

const prodPlugins = [
    new ProgressPlugin(),
    new ExtractTextPlugin('styles.[contenthash:8].css'),
    new SplitByPathPlugin([
        { name: 'vendor', path: [path.join(__dirname, '..', 'node_modules/')] },
    ]),
    new webpack.optimize.UglifyJsPlugin({
        sourceMap: false,
        compress: {
            warnings: false,
        },
        output: {
            comments: false,
        },
    }),
    // extract vendor chunks
    // new webpack.optimize.CommonsChunkPlugin({
    //     name: 'vendor',
    //     filename: 'vendor.[chunkhash:8].js',
    // }),
];

const plugins = basePlugins
  .concat(settings.isProduction() ? prodPlugins : [])
  .concat(settings.isDevelopment() ? devPlugins : []);

module.exports = plugins;