import path from 'path'
import webpack from 'webpack'
import config from '../src/config'

import defaultLoaders from './util/default-loaders'

export default {
	cache: true,
	entry: {
		app: path.join(config.clientDir, 'index.js'),
	},
	output: {
		path: config.buildDir,
		filename: '[name].js',
		publicPath: config.assetsPath,
	},
	plugins: [
		new webpack.DllReferencePlugin({
			context: config.srcDir,
			manifest: require(path.join(
				config.dllDir,
				`vendors-${
					process.env.NODE_ENV === 'development' ? 'development' : 'production'
				}-manifest.json`,
			)),
		}),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify(process.env.NODE_ENV),
			},
		}),
	],
	module: {
		loaders: defaultLoaders,
	},
	resolve: {
		modules: ['src', 'node_modules'],
		extensions: ['.js', '.jsx'],
		alias: {
			style: path.join(config.srcDir, 'style'),
			img: path.join(config.srcDir, 'img'),
			fonts: path.join(config.srcDir, 'fonts'),
		},
	},
}
