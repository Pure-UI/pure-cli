module.exports = function ( options ) {
	const webpack = require( 'webpack' );
	const makeConfig = require( './make-config' );

	const compiler = webpack( makeConfig( options ) );

	compiler.run( function ( err, stats ) {
		if ( err ) {
			console.log( err );
			return;
		}
		console.log( 'done' );
	} );
};
