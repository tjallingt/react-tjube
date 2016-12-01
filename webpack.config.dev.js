/* eslint import/no-extraneous-dependencies: 0 */

const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const config = require('./webpack.config.js');

const hotMiddlewareScript = 'webpack-hot-middleware/client';

config.entry.player = [config.entry.player, hotMiddlewareScript];
config.entry.remote = [config.entry.remote, hotMiddlewareScript];

config.module.loaders.unshift({
	test: /\.jsx?$/,
	loader: 'react-hot-loader',
	include: path.join(__dirname, 'src'),
});

config.plugins = [
	new ExtractTextPlugin('[name].css', { disable: true }),
	new webpack.optimize.OccurrenceOrderPlugin(),
	new webpack.HotModuleReplacementPlugin(),
	new webpack.NoErrorsPlugin(),
];

module.exports = config;
