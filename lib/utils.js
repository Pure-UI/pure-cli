const path = require( 'path' );

const cwd = process.cwd();

exports.cwd = function () {
	const args = [].slice.call( arguments );
	args.unshift( cwd );
	return path.resolve.apply( null, args );
};
