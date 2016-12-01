/* eslint import/no-extraneous-dependencies: 0 */

const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const postcssNested = require('postcss-nested');

module.exports = {
	entry: {
		player: './src/player.jsx',
		remote: './src/remote.jsx',
	},
	output: {
		path: path.join(__dirname, 'build'),
		publicPath: '/',
		filename: '[name].js',
	},
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				loader: 'babel-loader',
				include: path.join(__dirname, 'src'),
			},
			{
				test: /\.css$/,
				loader: ExtractTextPlugin.extract('style-loader', 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader'),
			},
		],
	},
	postcss: [
		postcssNested(),
	],
	plugins: [
		new ExtractTextPlugin('[name].css', { allChunks: true }),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify(process.env.NODE_ENV),
			},
		}),
	],
	resolve: {
		extensions: ['', '.js', '.jsx'],
	},
};
