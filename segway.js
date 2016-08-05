"use strict";

/*;
	@module-license:
		The MIT License (MIT)
		@mit-license

		Copyright (@c) 2016 Richeve Siodina Bebedor
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
			"http": "http"
		}
	@end-include
*/

if( typeof window == "undefined" ){
	var asea = require( "asea" );
	var http = require( "http" );
}

if( typeof window != "undefined" &&
	!( "asea" in window ) )
{
	throw new Error( "asea is not defined" );
}

/*;
	@option:
		{
			"response:required": "http.ServerResponse"
			"path:required": "string",
			"status:required": [
				"string",
				"number"
			],
			"data": [
				"string",
				"object"
			],
			"permanent": "boolean"
		}
	@end-option
*/
var segway = function segway( option ){
	/*;
		@meta-configuration:
			{
				"option": "object"
			}
		@end-meta-configuration
	*/

	var response = null;
	if( asea.server ){
		response = option.response;

		if( !response ||
			!( response instanceof http.ServerResponse ) )
		{
			throw new Error( "invalid response" );
		}
	}

	var path = option.path;
	if( typeof path != "string" ||
		!path )
	{
		throw new Error( "invalid path" );
	}

	var status = option.status;
	if( !( /^\d{3}$/ ).test( status.toString( ) ) ){
		throw new Error( "invalid status" );
	}

	var data = option.data;
	if( typeof data == "object" ){
		try{
			data = JSON.stringify( data );

		}catch( error ){
			throw new Error( "error stringifying data", error.message );
		}
	}

	if( typeof data == "string" &&
		data )
	{
		if( asea.server ){
			data = ( new Buffer( data ) ).toString( "base64" );

		}else if( asea.client ){
			data = btoa( data );
		}

		data = encodeURIComponent( data );

	}else{
		data = undefined;
	}

	var redirectPath = path + status;
	if( data ){
		redirectPath = redirectPath + "?data=" + data;
	}

	if( asea.server ){
		if( option.permanent ){
			response.redirect( 301, redirectPath );

		}else{
			response.redirect( redirectPath );
		}

	}else if( asea.client ){
		window.location.replace( redirectPath );
	}

	return redirectPath;
};

if( asea.server ){
	module.exports = segway;
}
