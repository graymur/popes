import path from 'path'
import webpack from 'webpack'
import config from '../src/config'
import uglifyPlugin from './util/uglify-plugin'
import defaultLoaders from './util/default-loaders'

const dllConfig = {
	entry: {
		vendors: [path.join(config.clientDir, 'vendors')],
		styles: [path.join(config.clientDir, 'styles')],
	},
	output: {
		path: config.dllDir,
		filename: `[name].${process.env.NODE_ENV}.js`,
		library: '[name]',
	},
	module: {
		loaders: defaultLoaders,
	},
	plugins: [
		new webpack.DllPlugin({
			path: path.join(config.dllDir, `[name]-${process.env.NODE_ENV}-manifest.json`),
			name: '[name]',
			context: config.srcDir,
		}),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify(process.env.NODE_ENV),
			},
		}),
	],
}

if (process.env.NODE_ENV === 'production') {
	dllConfig.plugins.push(uglifyPlugin)
}

export default dllConfig
