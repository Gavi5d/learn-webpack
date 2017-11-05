// webpack-dev-server 用于提供后台服务器
// 仅在 development 环境下使用
// 可以使用其热更新的模式
var WebpackDevServer = require( "webpack-dev-server" );
var webpack = require( "webpack" );
var config = require( "./webpack.config" );
var path = require( "path" );

var compiler = webpack( config );
var server = new WebpackDevServer( compiler, {
    hot: true,                              // 设置热更新
    filename: config.output.filename,       // 需要热更新的文件，bundle.js
    publicPath: config.output.publicPath,   // bundle.js 文件所在文件夹
    stats: {
        colors: true
    }
} );
server.listen( 8080, "localhost", function() {} );