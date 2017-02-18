const FriendlyErrorsWebpackPlugin = require( 'friendly-errors-webpack-plugin' );
const ExtractTextPlugin = require( 'extract-text-webpack-plugin' );
const _ = require( './utils' );

module.exports = function ( options ) {
	const webpackConfig = {
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
				{
					test: /\.(css|less)$/,
					exclude: /node_modules/,
					loader: ExtractTextPlugin.extract( 'style-loader', 'css-loader!postcss-loader!less-loader' ),
				},
				{
					test: /\.(ttf|woff|eot|svg)$/,
					exclude: /node_modules/,
					loader: 'url-loader?limit=102400&name=[name].[ext]?[hash:8]'
				},
			]
		},
		resolveLoader: {
			root: [
				_.dir( '../node_modules' ),
			],
		},
		resolve: {
			extensions: [ '', '.js', '.rgl' ],
			// 由于软连接后peerDependencies不会主动查找上层node_modules，指定fallback
			fallback: _.cwd( 'node_modules' ),
		},
		externals: [],
		plugins: [
			new FriendlyErrorsWebpackPlugin( {
				clearConsole: false,
			} ),
			new ExtractTextPlugin( 'index.css' ),
		]
	};

	// 将所有pure-*置为外部依赖
	if ( !options.bundle ) {
		webpackConfig.externals.push( pureAsExternals );
	}

	function pureAsExternals( context, request, callback ) {
		if ( request.startsWith( 'pure-' ) ) {
			return callback( null, 'umd ' + request );
		}

		callback();
	}

	return webpackConfig;
};
