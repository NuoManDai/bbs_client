/**
 * Function that returns default values.
 * Used because Object.assign does a shallow instead of a deep copy.
 * Using [].push will add to the base array, so a require will alter
 * the base array output.
 */
'use strict';

const path = require('path');
const srcPath = path.join(__dirname, '/../src');
const dfltPort = 8000;
const svgDirs = [
    require.resolve('antd-mobile').replace(/warn\.js$/, ''),  // 1. 属于 antd-mobile 内置 svg 文件
    // 2. 自己私人的 svg 存放目录
];

/**
 * Get the default modules object for webpack
 * @return {Object}
 */
function getDefaultModules() {
    return {
        preLoaders: [
            {
                test: /\.(js|jsx)$/,
                include: srcPath,
                loader: 'eslint-loader'
            }
        ],
        loaders: [
            {
                test: /\.css$/,
                loader: 'style!css!postcss'
            },
            {
                test: /\.sass/,
                loader: 'style-loader!css-loader!sass-loader?outputStyle=expanded&indentedSyntax'
            },
            {
                test: /\.scss/,
                loader: 'style-loader!css-loader!sass-loader?outputStyle=expanded'
            },
            {
                test: /\.less/,
                loader: 'style-loader!css-loader!less-loader'
            },
            {
                test: /\.styl/,
                loader: 'style-loader!css-loader!stylus-loader'
            },
            {
                test: /\.(png|jpg|gif|woff|woff2)$/,
                loader: 'url-loader?limit=8192'
            },
            {
                test: /\.(mp4|ogg)$/,
                loader: 'file-loader'
            },
            {
                test: /\.(svg)$/i,
                loader: 'svg-sprite',
                include: svgDirs,  // 把 svgDirs 路径下的所有 svg 文件交给 svg-sprite-loader 插件处理
            }
        ]
    };
}

module.exports = {
    srcPath: srcPath,
    publicPath: '/assets/',
    port: dfltPort,
    getDefaultModules: getDefaultModules
};
