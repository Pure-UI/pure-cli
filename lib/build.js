module.exports = function ( options ) {
	const webpack = require( 'webpack' );
	const makeConfig = require( './make-config' );

	const webpackConfig = makeConfig( options );
	const compiler = webpack( webpackConfig );

	compiler.run( function () {} );
};
