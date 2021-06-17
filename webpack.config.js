const path = require('path');

module.exports = {
    mode: 'production',
    entry: './src/index.js',
    output: {    
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [{
            exclude: path.resolve(__dirname, 'node_modules'),
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