import path from 'path'
import webpack from 'webpack'
import config from '../src/config'
import merge from 'merge-deep'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

import baseWebpackConfig from './webpack.config.base'

baseWebpackConfig.entry = [
	'react-hot-loader/patch',
	'webpack-hot-middleware/client',
	'webpack/hot/dev-server',
	baseWebpackConfig.entry.app,
]

const developmentConfig = merge(baseWebpackConfig, {
	devtool: 'cheap-source-map',
	output: {
		filename: 'app.js',
		publicPath: '/',
		path: process.cwd(),
	},
	module: {
		loaders: [],
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NamedModulesPlugin(),
		new ExtractTextPlugin('styles.css'),
		new webpack.DllReferencePlugin({
			context: config.srcDir,
			manifest: require(path.join(
				config.dllDir,
				`styles-${process.env.NODE_ENV}-manifest.json`,
			)),
		}),
	],
})

// remove 'postcss-loader' from dev config
developmentConfig.module.loaders = developmentConfig.module.loaders.map(
	loader =>
		loader.loaders
			? Object.assign({}, loader, {
					loaders: loader.loaders.filter(x => x !== 'postcss-loader'),
			  })
			: loader,
)

export default developmentConfig
