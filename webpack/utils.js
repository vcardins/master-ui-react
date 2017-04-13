const path = require('path');
const appConfig = require('./base.json');
const bundleConfig = require('./bundle.json');

const _ = module.exports = {}

Object.keys(appConfig).forEach((key) => {
    if (['port', 'host'].indexOf(key) > -1) {
        _[key] = process.env[key.toUpperCase()] || appConfig[key];  
    } 
    else {
        _[key] = appConfig[key];    
    }
})

_.hasProcessFlag = (flag) => process.argv.join('').indexOf(flag) > -1;

_.cwd = (file) => {
    return path.join(process.cwd(), file || '')
}

_.getEnv = () => process.env.NODE_ENV;

_.env          = process.env.NODE_ENV || 'development';
_.NODE_ENV     = _.env;
_.__DEV__      = _.env === 'development';
_.__PROD__     = _.env === 'production';
_.__TEST__     = _.env === 'test';
_.__BASENAME__ = JSON.stringify(process.env.BASENAME || '');

_.isProduction = () => _.getEnv() === 'production';

_.isDevelopment = () => !_.isProduction();

_.isTest = () => process.env.TEST;

_.isHmrEnabled = () => _.hasProcessFlag('hot');

_.root = path.resolve(__dirname, '..');

_.template = path.resolve(_.root, appConfig.srcFolder, appConfig.indexFile);

_.outputPath = path.join(_.root, appConfig.distFolder);

_.outputIndexPath = path.join(_.outputPath, appConfig.entryFile);

_.bundleOutputPath = path.join(_.outputPath, appConfig.indexFile);

_.distPath = path.join(__dirname, `./../${appConfig.distFolder}`),

_.srcPath = path.join(__dirname, `./../${appConfig.srcFolder}`),

// Bundle Helpers

_.bundleName = bundleConfig.bundleName;

_.getCssBundleFilename = () => `${_.bundleName}${_.isProduction() ? '.min' : ''}.css`;

_.getJsBundleFilename = () => `${_.bundleName}${_.isProduction() ? '.min' : ''}.js`;

_.loadersOptions = () => {
    return {
        minimize: _.isProduction(),
        options: {
            // css-loader relies on context
            context: process.cwd(),
            babel: appConfig.babel,
        },
    }
}
