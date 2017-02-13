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
} else if ( argv.bundle ) {
	build( {
		bundle: true,
		entry: argv.entry,
		name: argv.name,
	} );
} else {
	build( {
		bundle: false,
		entry: argv.entry,
		name: argv.name,
	} );
}
