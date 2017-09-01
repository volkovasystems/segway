"use strict";

/*;
	@module-license:
		The MIT License (MIT)
		@mit-license

		Copyright (@c) 2017 Richeve Siodina Bebedor
		@email: richeve.bebedor@gmail.com

		Permission is hereby granted, free of charge, to any person obtaining a copy
		of this software and associated documentation files (the "Software"), to deal
		in the Software without restriction, including without limitation the rights
		to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
		copies of the Software, and to permit persons to whom the Software is
		furnished to do so, subject to the following conditions:

		The above copyright notice and this permission notice shall be included in all
		copies or substantial portions of the Software.

		THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
		IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
		FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
		AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
		LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
		OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
		SOFTWARE.
	@end-module-license

	@module-configuration:
		{
			"package": "segway",
			"path": "segway/segway.js",
			"file": "segway.js",
			"module": "segway",
			"author": "Richeve S. Bebedor",
			"contributors": [
				"John Lenon Maghanoy <johnlenonmaghanoy@gmail.com>"
			],
			"eMail": "richeve.bebedor@gmail.com",
			"repository": "https://github.com/volkovasystems/segway.git",
			"test": "segway-test.js",
			"global": true
		}
	@end-module-configuration

	@module-documentation:
		Data is base 64 encoded then applied with encodeURIComponent.
	@end-module-documentation

	@include:
		{
			"asea": "asea",
			"calcify": "calcify",
			"clazof": "clazof",
			"falze": "falze",
			"falzy": "falzy",
			"http": "http",
			"lilfy": "lilfy",
			"truly": "truly",
			"truu": "truu"
		}
	@end-include
*/

const asea = require( "asea" );
const calcify = require( "calcify" );
const clazof = require( "clazof" );
const falze = require( "falze" );
const falzy = require( "falzy" );
const lilfy = require( "lilfy" );
const truly = require( "truly" );
const truu = require( "truu" );

//: @server:
const http = require( "http" );
//: @end-server

/*;
	@option:
		{
			"response:required": "http.ServerResponse"
			"path:required": "string",
			"status:required": "string",
			"data": [
				"string",
				"object"
			],
			"permanent": "boolean"
		}
	@end-option
*/
const segway = function segway( option ){
	/*;
		@meta-configuration:
			{
				"option": "object"
			}
		@end-meta-configuration
	*/

	let response = null;
	if( asea.SERVER ){
		response = option.response;

		if( falze( response ) ||
			!clazof( response, http.ServerResponse ) ||
			typeof response.redirect != "function" )
		{
			throw new Error( "invalid response" );
		}
	}

	let path = option.path;
	if( falzy( path ) || typeof path != "string" ){
		throw new Error( "invalid path" );
	}

	let status = option.status;
	if( falzy( status ) || typeof status != "string" ){
		throw new Error( "invalid status" );
	}

	let data = option.data;
	if( typeof data == "object" && truu( data ) ){
		try{
			data = calcify( data );

		}catch( error ){
			throw new Error( `error stringify data, ${ error.stack }` );
		}
	}

	if( typeof data == "string" && truly( data ) ){
		data = lilfy( data );
	}

	let redirectPath = `${ path }/${ status }`;
	if( truly( data ) ){
		redirectPath = redirectPath + "?data=" + data;
	}

	if( asea.SERVER ){
		if( option.permanent === true ){
			response.redirect( 301, redirectPath );

		}else{
			response.redirect( redirectPath );
		}

	}else if( asea.CLIENT ){
		window.location.replace( redirectPath );
	}

	return redirectPath;
};

module.exports = segway;
