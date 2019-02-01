var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'assets');
var APP_DIR = path.resolve(__dirname, 'src');
var isProduction = process.env.NODE_ENV === 'production';

var config = {
    mode: 'development',
    watch: true,
    watchOptions: {
        ignored: /node_modules/,
        poll: true
    },
    entry: {
        'public/public':
        APP_DIR + '/client/public/index'
        ,
    },
    output: {
        path: BUILD_DIR,
        filename: '[name].js'
    },
    module : {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            }
        ]
    }
};

module.exports = config;