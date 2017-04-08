/* eslint import/no-extraneous-dependencies: 0 */

const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const config = require('./webpack.config.js');

const hotMiddlewareScript = 'webpack-hot-middleware/client';

config.entry.player = [config.entry.player, hotMiddlewareScript];
config.entry.remote = [config.entry.remote, hotMiddlewareScript];

config.module.rules.unshift({
	test: /\.jsx?$/,
	use: 'react-hot-loader',
	include: path.join(__dirname, 'src'),
});

config.plugins = [
	new ExtractTextPlugin({ disable: true }),
	new webpack.optimize.OccurrenceOrderPlugin(),
	new webpack.HotModuleReplacementPlugin(),
	new webpack.NoEmitOnErrorsPlugin(),
];

module.exports = config;
