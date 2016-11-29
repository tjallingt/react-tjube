/* eslint import/no-extraneous-dependencies: 0 */

const path = require('path');
const webpack = require('webpack');
const config = require('./webpack.config.js');

const hotMiddlewareScript = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true';

config.entry.player = [config.entry.player, hotMiddlewareScript];
config.entry.remote = [config.entry.remote, hotMiddlewareScript];

config.module.loaders.unshift({
	test: /\.jsx?$/,
	loader: 'react-hot-loader',
	include: path.join(__dirname, 'src'),
});

config.plugins.push(
	new webpack.HotModuleReplacementPlugin(),
	new webpack.NoErrorsPlugin()
);

module.exports = config;
