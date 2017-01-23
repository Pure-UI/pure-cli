const _ = require( './utils' );

module.exports = function ( options ) {
	return {
		entry: _.cwd( 'src/index.js' ),
		output: {
			path: _.cwd( 'lib' ),
			filename: 'index.js',
			libraryTarget: 'umd',
		},
		module: {
			loaders: [
				{
					test: /\.rgl$/,
					loader: 'pure',
					exclude: /node_modules/,
				},
				{
					test: /\.js$/,
					loader: 'babel',
					exclude: /node_modules/,
					query: {
						"presets": [
							"es2015"
						]
					},
				},
			]
		},
		resolve: {
			extensions: [ '', '.js', '.rgl' ]
		},
		// plugins: [
		// 	new webpack.optimize.UglifyJsPlugin({
		// 		compress: {
		// 			warnings: false
		// 		}
		// 	}),
		// ]
	};
};
