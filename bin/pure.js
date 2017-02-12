#!/usr/bin/env node
'use strict';

const yargs = require( 'yargs' );
const build = require( '../lib/build' );
const watch = require( '../lib/watch' );

const argv = yargs
	.alias( 'w', 'watch' )
	.argv;

if ( argv.watch ) {
	watch();
} else {
	build( {
		entry: argv.entry,
		name: argv.name,
	} );
}
