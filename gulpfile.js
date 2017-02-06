"use strict";

const debug = require( "gulp-debug" );
const del = require( "del" );
const gulp = require( "gulp" );
const plumber = require( "gulp-plumber" );
const rename = require( "gulp-rename" );
const replace = require( "gulp-replace" );

const serverPattern = /\/\/\:\s*\@server\:(.+?|[^]+?)\/\/\:\s*\@end\-server/gm;

gulp.task( "client", function dropServer( ){
	return del( "segway.support.js" ).then( ( ) => {
		gulp.src( "segway.js" )
			.pipe( plumber( ) )
			.pipe( debug( { "title": "File:" } ) )
			.pipe( replace( serverPattern, "" ) )
			.pipe( rename( "segway.support.js" ) )
			.pipe( gulp.dest( "./" ) );
	} );
} );

gulp.task( "default", [ "client" ] );
