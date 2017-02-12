const FriendlyErrorsWebpackPlugin = require( 'friendly-errors-webpack-plugin' );
const _ = require( './utils' );

module.exports = function ( options ) {
	return {
		entry: options.entry ? _.cwd( options.entry ) : _.cwd( 'src/index.js' ),
		output: {
			path: _.cwd( 'lib' ),
			filename: 'index.js',
			libraryTarget: 'umd',
			library: options.name || ''
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
						babelrc: false,
						presets: [ require.resolve( 'babel-preset-es2015' ) ]
					},
				},
			]
		},
		resolveLoader: {
			root: [
				_.dir( '../node_modules' ),
			],
		},
		resolve: {
			extensions: [ '', '.js', '.rgl' ]
		},
		externals: [
			function ( context, request, callback ) {
				if ( request.startsWith( 'pure-' ) ) {
					return callback( null, 'umd ' + request );
				}

				callback();
			}
		],
		plugins: [
			new FriendlyErrorsWebpackPlugin( {
				clearConsole: false,
			} ),
		]
	};
};
