/* eslint import/no-extraneous-dependencies: 0 */

const path = require('path');
// const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const here = (...args) => path.resolve(__dirname, ...args);

module.exports = {
	mode: 'production',
	entry: {
		player: './src/player.jsx',
		remote: './src/remote.jsx',
	},
	output: {
		path: here('build'),
		publicPath: '/',
		filename: '[name].js',
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				use: 'babel-loader', // somehow use ["es2015", { modules: false }] in production only...
				include: here('src'),
			},
			{
				test: /\.css$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							modules: true,
							importLoaders: 1,
							localIdentName: '[name]__[local]___[hash:base64:5]',
						},
					},
					'postcss-loader',
				],
			},
		],
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: '[name].css',
		}),
	],
	resolve: {
		extensions: ['.js', '.jsx'],
		enforceExtension: false,
	},
};
