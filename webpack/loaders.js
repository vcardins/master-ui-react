
exports.javascript = {
    test: /\.(js|jsx)$/,
    loaders: ['babel-loader'],
    exclude: [/node_modules/],
};

exports.typescript = {
    test: /\.(ts|tsx)$/,
    loaders: ['react-hot-loader/webpack', `awesome-typescript-loader?${JSON.stringify({ignoreDiagnostics:[2320, 2307]})}`],
    exclude: /node_modules/,
};

exports.tslint = {
    test: /\.(ts|tsx)$/,
    loader: 'tslint-loader',
    enforce: 'pre',
};

exports.json = {
    test: /\.json$/,
    loader: 'json-loader',
};

exports.html = {
    test: /\.html$/,
    loader: 'raw',
    exclude: /node_modules/,
};

exports.files = {
    test: /\.(ico|jpg|png|gif|eot|otf|webp|ttf|woff|woff2)(\?.*)?$/,
    loader: 'file-loader?limit=100000',
};

exports.svg = {
    test: /\.svg$/,
    loader: 'file-loader',
};

exports.styles = [
    {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader', 'resolve-url-loader', 'postcss-loader'],
    }, {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'resolve-url-loader', 'sass-loader', 'postcss-loader'],
    },
];
