// 在 webpack 中所有的文件都是模块
// 可以像导入模块的方式导入 css 文件
var style = require( './style/globalStyle.css' );

// jQuery 模块也可以以模块的方式导入
// 利用 webpack 将 jQuery 编译放入 bundle 文件中
import $ from 'jquery';

var app = document.getElementById( 'app' );
// `` 反双斜杠
// 这是 ES6 的用法，叫做 template literals，语法类似下面所示
// `string text ${expression} string text`
app.innerHTML = `
    <div id="menu">
        <button id="loadPage1">load page 1</button>
        <button id="loadPage2">load page 2</button>
    </div>
    <div id="content">
        <h1>Home</h1>
    </div>
`;

document.getElementById( 'loadPage1' ).addEventListener( 'click', () => {
    // Promise
    System.import( './page1' )
        .then( pageModule => {
            document.getElementById( 'content' ).innerHTML = pageModule.default;
        } );
} );

document.getElementById( 'loadPage2' ).addEventListener( 'click', () => {
    System.import( './page2' )
        .then( pageModule => {
            document.getElementById( 'content' ).innerHTML = pageModule.default;
        } );
} );

$( '#app' ).css( 'background-color', 'yellow' );

if (module.hot) {
    module.hot.accept();
}