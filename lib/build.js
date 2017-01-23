module.exports = function ( options ) {
	const webpack = require( 'webpack' );
	const makeConfig = require( './make-config' );

	const webpackConfig = makeConfig( options );
	console.log( 'webpackConfig', webpackConfig );
	const compiler = webpack( webpackConfig );

	compiler.run( function ( err, stats ) {
		if ( err ) {
			console.log( err );
			return;
		}
		console.log( 'done' );
	} );
};
