const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config');
const config = require('./webpack/utils');
const _debug = require('debug');
const debug = _debug('app:webpack:compiler');

const app = express();
const Console = console;

let compiler

try {
    debug('Creating configuration.')
    compiler = webpack(webpackConfig)
} 
catch (err) {
    Console.error(err.message);  // eslint-disable-no-console
    process.exit(1)
}

const devMiddleWare = require('webpack-dev-middleware')(compiler, {
    publicPath: webpackConfig.output.publicPath,
    quiet: true,
    inline: true,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*',
        'Access-Control-Allow-Headers': '*',
    },
})
app.use(devMiddleWare)
app.use(require('webpack-hot-middleware')(compiler, {
    log: Console.log, // eslint-disable-no-console
}))

const mfs = devMiddleWare.fileSystem;
const file = path.join(webpackConfig.output.path, 'index.html')

devMiddleWare.waitUntilValid()

app.get('*', (req, res) => {
    devMiddleWare.waitUntilValid(() => res.end(mfs.readFileSync(file)))
})

app.listen(config.port)
