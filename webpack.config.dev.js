/* eslint import/no-extraneous-dependencies: 0 */

const webpack = require('webpack');
const config = require('./webpack.config.js');

const hotMiddlewareScript = 'webpack-hot-middleware/client';

config.mode = 'development';

config.entry.player = [config.entry.player, hotMiddlewareScript];
config.entry.remote = [config.entry.remote, hotMiddlewareScript];

Array.prototype.push.apply(config.plugins, [
	new webpack.optimize.OccurrenceOrderPlugin(),
	new webpack.HotModuleReplacementPlugin(),
	new webpack.NoEmitOnErrorsPlugin(),
]);

config.devtool = 'cheap-module-eval-source-map';

module.exports = config;
