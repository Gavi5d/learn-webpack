var path = require('path');
var webpack = require("webpack");
// extract-text-webpack-plugin 用于从 bundle 中抽取文字并放入单独文件中
// 这里主要将 css style 的文字抽取出来
var ExtractTextPlugin = require( 'extract-text-webpack-plugin' );
var HTMLWebpackPlugin = require( 'html-webpack-plugin' );

// 获取当前环境变量
// env(string) 末尾有一个符号需要删除
var env = process.env.NODE_ENV;

var DEVELOPMENT = env.trim() === 'development';
var PRODUCTION = env.trim() === 'production';

var entry = PRODUCTION ?
    ['./src/index.js'] :
    ['./src/index.js',
        'webpack/hot/dev-server',
        'webpack-dev-server/client?http://localhost:8080'];

var plugins = PRODUCTION ? [
        // new webpack.optimize.UglifyJsPlugin(),  // 用于 compress
        new ExtractTextPlugin( 'style.css' ),   // 用于将 css 文字抽取放入单独文件
        new HTMLWebpackPlugin( {
            template: 'index-template.html'
        } )
    ] : [new webpack.HotModuleReplacementPlugin()];  // 用于热更新

plugins.push(
    // DefinePlugin 用于创建全局变量，可在 index.js 中使用
    new webpack.DefinePlugin( {
        DEVELOPMENT: JSON.stringify( DEVELOPMENT ),
        PRODUCTION: JSON.stringify( PRODUCTION )
    } )
);

const cssIdentifier = PRODUCTION ? '[hash:base64:10]' : '[path][name]---[local]';

const cssLoader = PRODUCTION ?
    ExtractTextPlugin.extract( 'css-loader?localIdentName=' + cssIdentifier ) :
    ['style-loader', 'css-loader?localIdentName=' + cssIdentifier];

module.exports = {
    externals: {
        'jquery': 'jQuery'
    },
    devtool: "source-map",  // 便于调试，可以将编译后的代码链接到编译前的代码中
    entry: entry,
    plugins: plugins,
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: ['babel-loader'],
                exclude: '/node_modules/'
            },
            {
                test: /\.(png|jpg|gif)$/,
                loaders: ['url-loader?limits=10000&name=images/[hash:12].[ext]'],
                exclude: '/node_modules/'
            },
            {
                test: /\.css$/,
                loaders: cssLoader,
                exclude: '/node_modules/'
            }
        ]
    },
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: PRODUCTION ? '/' : '/dist/',
        filename: 'bundle.js'
    }
};