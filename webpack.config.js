/* eslint import/no-extraneous-dependencies: 0 */

const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const postcssNested = require('postcss-nested');

module.exports = {
	entry: {
		player: './src/player.jsx',
		remote: './src/remote.jsx',
	},
	output: {
		path: 'build',
		filename: '[name].js',
	},
	module: {
		loaders: [
			{
				test: /\.(js|jsx)$/,
				loader: 'babel',
				include: path.join(__dirname, 'src'),
			},
			{
				test: /\.css$/,
				loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss'),
			},
		],
	},
	postcss: [
		postcssNested(),
	],
	plugins: [
		new ExtractTextPlugin('[name].css', { allChunks: true }),
	],
	resolve: {
		extensions: ['', '.js', '.jsx'],
	},
};
