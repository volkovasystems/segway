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
              			"protype": "protype",
              			"truly": "truly",
              			"truu": "truu"
              		}
              	@end-include
              */

var asea = require("asea");
var calcify = require("calcify");
var clazof = require("clazof");
var falze = require("falze");
var falzy = require("falzy");
var lilfy = require("lilfy");
var protype = require("protype");
var truly = require("truly");
var truu = require("truu");



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
var segway = function segway(option) {
	/*;
                                      	@meta-configuration:
                                      		{
                                      			"option": "object"
                                      		}
                                      	@end-meta-configuration
                                      */

	var response = null;
	if (asea.server) {
		response = option.response;

		if (falze(response) ||
		!clazof(response, http.ServerResponse) ||
		!protype(response.redirect, FUNCTION))
		{
			throw new Error("invalid response");
		}
	}

	var path = option.path;
	if (falzy(path) || !protype(path, STRING)) {
		throw new Error("invalid path");
	}

	var status = option.status;
	if (falzy(status) || !protype(status, STRING)) {
		throw new Error("invalid status");
	}

	var data = option.data;
	if (protype(data, OBJECT) && truu(data)) {
		try {
			data = calcify(data);

		} catch (error) {
			throw new Error("error stringify data, " + error);
		}
	}

	if (protype(data, STRING) && truly(data)) {
		data = lilfy(data);
	}

	var redirectPath = path + "/" + status;
	if (truly(data)) {
		redirectPath = redirectPath + "?data=" + data;
	}

	if (asea.server) {
		if (option.permanent === true) {
			response.redirect(301, redirectPath);

		} else {
			response.redirect(redirectPath);
		}

	} else if (asea.client) {
		window.location.replace(redirectPath);
	}

	return redirectPath;
};

module.exports = segway;

//# sourceMappingURL=segway.support.js.map