/* eslint import/no-extraneous-dependencies: 0 */

const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const config = require('./webpack.config.js');

const hotMiddlewareScript = 'webpack-hot-middleware/client';

config.mode = 'development';

config.entry.player = [config.entry.player, hotMiddlewareScript];
config.entry.remote = [config.entry.remote, hotMiddlewareScript];

config.plugins = [
	new ExtractTextPlugin({ disable: true }),
	new webpack.optimize.OccurrenceOrderPlugin(),
	new webpack.HotModuleReplacementPlugin(),
	new webpack.NoEmitOnErrorsPlugin(),
];

config.devtool = 'cheap-module-eval-source-map';

module.exports = config;
