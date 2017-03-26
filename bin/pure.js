#!/usr/bin/env node
'use strict';

const yargs = require( 'yargs' );
const build = require( '../lib/build' );
const watch = require( '../lib/watch' );

const argv = yargs
	.alias( 'w', 'watch' )
	.boolean( 'external' )
	.argv;

if ( argv.watch ) {
	watch();
} else {
	build( {
		bundle: Boolean( argv.bundle ),
		preferSource: Boolean( argv.preferSource ),
		entry: argv.entry,
		name: argv.name,
	} );
}
