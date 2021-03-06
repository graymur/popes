import bundleAnalyzerPlugin from './util/bundle-analyzer-plugin' // eslint-disable-line
import path from 'path'
import config from '../src/config'
import merge from 'merge-deep'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import htmlPlugin from './util/html-plugin'
import uglifyPlugin from './util/uglify-plugin'
import baseWebpackConfig from './webpack.config.base'
import webpack from 'webpack'

const productionConfig = merge(baseWebpackConfig, {
	output: {
		chunkFilename: '[name].js',
	},
	plugins: [
		new CopyWebpackPlugin([
			{
				from: path.join(config.dllDir, `vendors.${process.env.NODE_ENV}.js`),
				to: path.join(config.buildDir, 'vendors.js'),
			},
		]),
		new CopyWebpackPlugin([
			{
				from: path.join(config.serverDir, 'data'),
				to: path.join(config.buildDir, 'data'),
			},
		]),
		new ExtractTextPlugin('styles.css'),
		htmlPlugin,
		uglifyPlugin,
		// bundleAnalyzerPlugin,
		new webpack.optimize.ModuleConcatenationPlugin(),
	],
})

productionConfig.module.loaders
	.filter(
		loader =>
			loader.loaders && loader.loaders.find(name => /css/.test(name.split('?')[0])),
	)
	.forEach(loader => {
		const [fallback, ...rest] = loader.loaders
		loader.loader = ExtractTextPlugin.extract({
			fallback,
			use: rest,
		})

		delete loader.loaders
	})

export default productionConfig
