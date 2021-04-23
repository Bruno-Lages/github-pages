const resolve = require('path').resolve;

module.exports = {
    mode: 'production',
    entry: './src/index.js',
    output: {    
        filename: 'bundle.js',
        path: resolve(__dirname, 'dist'),
    },
    module: {
        rules: [{
            exclude: resolve(__dirname, 'node_modules'),
            test: /\.js$/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/env']
                }
            }
        }]
    },
    devtool: 'source-map',
};