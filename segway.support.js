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
			"clazof": "clazof",
			"falze": "falze",
			"falzy": "falzy",
			"http": "http",
			"protype": "protype",
			"truly": "truly"
		}
	@end-include
*/

var _stringify = require("babel-runtime/core-js/json/stringify");

var _stringify2 = _interopRequireDefault(_stringify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var asea = require("asea");
var clazof = require("clazof");
var falze = require("falze");
var falzy = require("falzy");
var http = require("http");
var protype = require("protype");
var truly = require("truly");

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

		if (falze(response) || !clazof(response, http.ServerResponse)) {
			throw new Error("invalid response");
		}
	}

	var path = option.path;
	if (!protype(path, STRING) || falzy(path)) {
		throw new Error("invalid path");
	}

	var status = option.status;
	if (!/^\d{3}$/.test(status.toString())) {
		throw new Error("invalid status");
	}

	var data = option.data;
	if (protype(data, OBJECT)) {
		try {
			data = (0, _stringify2.default)(data);
		} catch (error) {
			throw new Error("error stringifying data", error.message);
		}
	}

	if (protype(data, STRING) && truly(data)) {
		if (asea.server) {
			data = new Buffer(data).toString("base64");
		} else if (asea.client) {
			data = btoa(data);
		}

		data = encodeURIComponent(data);
	} else {
		data = undefined;
	}

	var redirectPath = path + status;
	if (data) {
		redirectPath = redirectPath + "?data=" + data;
	}

	if (asea.server) {
		if (option.permanent) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlZ3dheS5qcyJdLCJuYW1lcyI6WyJhc2VhIiwicmVxdWlyZSIsImNsYXpvZiIsImZhbHplIiwiZmFsenkiLCJodHRwIiwicHJvdHlwZSIsInRydWx5Iiwic2Vnd2F5Iiwib3B0aW9uIiwicmVzcG9uc2UiLCJzZXJ2ZXIiLCJTZXJ2ZXJSZXNwb25zZSIsIkVycm9yIiwicGF0aCIsIlNUUklORyIsInN0YXR1cyIsInRlc3QiLCJ0b1N0cmluZyIsImRhdGEiLCJPQkpFQ1QiLCJlcnJvciIsIm1lc3NhZ2UiLCJCdWZmZXIiLCJjbGllbnQiLCJidG9hIiwiZW5jb2RlVVJJQ29tcG9uZW50IiwidW5kZWZpbmVkIiwicmVkaXJlY3RQYXRoIiwicGVybWFuZW50IiwicmVkaXJlY3QiLCJ3aW5kb3ciLCJsb2NhdGlvbiIsInJlcGxhY2UiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTZEQSxJQUFNQSxPQUFPQyxRQUFTLE1BQVQsQ0FBYjtBQUNBLElBQU1DLFNBQVNELFFBQVMsUUFBVCxDQUFmO0FBQ0EsSUFBTUUsUUFBUUYsUUFBUyxPQUFULENBQWQ7QUFDQSxJQUFNRyxRQUFRSCxRQUFTLE9BQVQsQ0FBZDtBQUNBLElBQU1JLE9BQU9KLFFBQVMsTUFBVCxDQUFiO0FBQ0EsSUFBTUssVUFBVUwsUUFBUyxTQUFULENBQWhCO0FBQ0EsSUFBTU0sUUFBUU4sUUFBUyxPQUFULENBQWQ7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWtCQSxJQUFNTyxTQUFTLFNBQVNBLE1BQVQsQ0FBaUJDLE1BQWpCLEVBQXlCO0FBQ3ZDOzs7Ozs7OztBQVFBLEtBQUlDLFdBQVcsSUFBZjtBQUNBLEtBQUlWLEtBQUtXLE1BQVQsRUFBaUI7QUFDaEJELGFBQVdELE9BQU9DLFFBQWxCOztBQUVBLE1BQUlQLE1BQU9PLFFBQVAsS0FDSCxDQUFHUixPQUFRUSxRQUFSLEVBQWtCTCxLQUFLTyxjQUF2QixDQURKLEVBRUE7QUFDQyxTQUFNLElBQUlDLEtBQUosQ0FBVyxrQkFBWCxDQUFOO0FBQ0E7QUFDRDs7QUFFRCxLQUFJQyxPQUFPTCxPQUFPSyxJQUFsQjtBQUNBLEtBQUksQ0FBQ1IsUUFBU1EsSUFBVCxFQUFlQyxNQUFmLENBQUQsSUFDSFgsTUFBT1UsSUFBUCxDQURELEVBRUE7QUFDQyxRQUFNLElBQUlELEtBQUosQ0FBVyxjQUFYLENBQU47QUFDQTs7QUFFRCxLQUFJRyxTQUFTUCxPQUFPTyxNQUFwQjtBQUNBLEtBQUksQ0FBRyxTQUFGLENBQWNDLElBQWQsQ0FBb0JELE9BQU9FLFFBQVAsRUFBcEIsQ0FBTCxFQUErQztBQUM5QyxRQUFNLElBQUlMLEtBQUosQ0FBVyxnQkFBWCxDQUFOO0FBQ0E7O0FBRUQsS0FBSU0sT0FBT1YsT0FBT1UsSUFBbEI7QUFDQSxLQUFJYixRQUFTYSxJQUFULEVBQWVDLE1BQWYsQ0FBSixFQUE2QjtBQUM1QixNQUFHO0FBQ0ZELFVBQU8seUJBQWdCQSxJQUFoQixDQUFQO0FBRUEsR0FIRCxDQUdDLE9BQU9FLEtBQVAsRUFBYztBQUNkLFNBQU0sSUFBSVIsS0FBSixDQUFXLHlCQUFYLEVBQXNDUSxNQUFNQyxPQUE1QyxDQUFOO0FBQ0E7QUFDRDs7QUFFRCxLQUFJaEIsUUFBU2EsSUFBVCxFQUFlSixNQUFmLEtBQTJCUixNQUFPWSxJQUFQLENBQS9CLEVBQThDO0FBQzdDLE1BQUluQixLQUFLVyxNQUFULEVBQWlCO0FBQ2hCUSxVQUFTLElBQUlJLE1BQUosQ0FBWUosSUFBWixDQUFGLENBQXVCRCxRQUF2QixDQUFpQyxRQUFqQyxDQUFQO0FBRUEsR0FIRCxNQUdNLElBQUlsQixLQUFLd0IsTUFBVCxFQUFpQjtBQUN0QkwsVUFBT00sS0FBTU4sSUFBTixDQUFQO0FBQ0E7O0FBRURBLFNBQU9PLG1CQUFvQlAsSUFBcEIsQ0FBUDtBQUVBLEVBVkQsTUFVSztBQUNKQSxTQUFPUSxTQUFQO0FBQ0E7O0FBRUQsS0FBSUMsZUFBZWQsT0FBT0UsTUFBMUI7QUFDQSxLQUFJRyxJQUFKLEVBQVU7QUFDVFMsaUJBQWVBLGVBQWUsUUFBZixHQUEwQlQsSUFBekM7QUFDQTs7QUFFRCxLQUFJbkIsS0FBS1csTUFBVCxFQUFpQjtBQUNoQixNQUFJRixPQUFPb0IsU0FBWCxFQUFzQjtBQUNyQm5CLFlBQVNvQixRQUFULENBQW1CLEdBQW5CLEVBQXdCRixZQUF4QjtBQUVBLEdBSEQsTUFHSztBQUNKbEIsWUFBU29CLFFBQVQsQ0FBbUJGLFlBQW5CO0FBQ0E7QUFFRCxFQVJELE1BUU0sSUFBSTVCLEtBQUt3QixNQUFULEVBQWlCO0FBQ3RCTyxTQUFPQyxRQUFQLENBQWdCQyxPQUFoQixDQUF5QkwsWUFBekI7QUFDQTs7QUFFRCxRQUFPQSxZQUFQO0FBQ0EsQ0ExRUQ7O0FBNEVBTSxPQUFPQyxPQUFQLEdBQWlCM0IsTUFBakIiLCJmaWxlIjoic2Vnd2F5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qO1xuXHRAbW9kdWxlLWxpY2Vuc2U6XG5cdFx0VGhlIE1JVCBMaWNlbnNlIChNSVQpXG5cdFx0QG1pdC1saWNlbnNlXG5cblx0XHRDb3B5cmlnaHQgKEBjKSAyMDE3IFJpY2hldmUgU2lvZGluYSBCZWJlZG9yXG5cdFx0QGVtYWlsOiByaWNoZXZlLmJlYmVkb3JAZ21haWwuY29tXG5cblx0XHRQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG5cdFx0b2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuXHRcdGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcblx0XHR0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG5cdFx0Y29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG5cdFx0ZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcblxuXHRcdFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbFxuXHRcdGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG5cblx0XHRUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG5cdFx0SU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG5cdFx0RklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG5cdFx0QVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuXHRcdExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG5cdFx0T1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEVcblx0XHRTT0ZUV0FSRS5cblx0QGVuZC1tb2R1bGUtbGljZW5zZVxuXG5cdEBtb2R1bGUtY29uZmlndXJhdGlvbjpcblx0XHR7XG5cdFx0XHRcInBhY2thZ2VcIjogXCJzZWd3YXlcIixcblx0XHRcdFwicGF0aFwiOiBcInNlZ3dheS9zZWd3YXkuanNcIixcblx0XHRcdFwiZmlsZVwiOiBcInNlZ3dheS5qc1wiLFxuXHRcdFx0XCJtb2R1bGVcIjogXCJzZWd3YXlcIixcblx0XHRcdFwiYXV0aG9yXCI6IFwiUmljaGV2ZSBTLiBCZWJlZG9yXCIsXG5cdFx0XHRcImNvbnRyaWJ1dG9yc1wiOiBbXG5cdFx0XHRcdFwiSm9obiBMZW5vbiBNYWdoYW5veSA8am9obmxlbm9ubWFnaGFub3lAZ21haWwuY29tPlwiXG5cdFx0XHRdLFxuXHRcdFx0XCJlTWFpbFwiOiBcInJpY2hldmUuYmViZWRvckBnbWFpbC5jb21cIixcblx0XHRcdFwicmVwb3NpdG9yeVwiOiBcImh0dHBzOi8vZ2l0aHViLmNvbS92b2xrb3Zhc3lzdGVtcy9zZWd3YXkuZ2l0XCIsXG5cdFx0XHRcInRlc3RcIjogXCJzZWd3YXktdGVzdC5qc1wiLFxuXHRcdFx0XCJnbG9iYWxcIjogdHJ1ZVxuXHRcdH1cblx0QGVuZC1tb2R1bGUtY29uZmlndXJhdGlvblxuXG5cdEBtb2R1bGUtZG9jdW1lbnRhdGlvbjpcblx0XHREYXRhIGlzIGJhc2UgNjQgZW5jb2RlZCB0aGVuIGFwcGxpZWQgd2l0aCBlbmNvZGVVUklDb21wb25lbnQuXG5cdEBlbmQtbW9kdWxlLWRvY3VtZW50YXRpb25cblxuXHRAaW5jbHVkZTpcblx0XHR7XG5cdFx0XHRcImFzZWFcIjogXCJhc2VhXCIsXG5cdFx0XHRcImNsYXpvZlwiOiBcImNsYXpvZlwiLFxuXHRcdFx0XCJmYWx6ZVwiOiBcImZhbHplXCIsXG5cdFx0XHRcImZhbHp5XCI6IFwiZmFsenlcIixcblx0XHRcdFwiaHR0cFwiOiBcImh0dHBcIixcblx0XHRcdFwicHJvdHlwZVwiOiBcInByb3R5cGVcIixcblx0XHRcdFwidHJ1bHlcIjogXCJ0cnVseVwiXG5cdFx0fVxuXHRAZW5kLWluY2x1ZGVcbiovXG5cbmNvbnN0IGFzZWEgPSByZXF1aXJlKCBcImFzZWFcIiApO1xuY29uc3QgY2xhem9mID0gcmVxdWlyZSggXCJjbGF6b2ZcIiApO1xuY29uc3QgZmFsemUgPSByZXF1aXJlKCBcImZhbHplXCIgKTtcbmNvbnN0IGZhbHp5ID0gcmVxdWlyZSggXCJmYWx6eVwiICk7XG5jb25zdCBodHRwID0gcmVxdWlyZSggXCJodHRwXCIgKTtcbmNvbnN0IHByb3R5cGUgPSByZXF1aXJlKCBcInByb3R5cGVcIiApO1xuY29uc3QgdHJ1bHkgPSByZXF1aXJlKCBcInRydWx5XCIgKTtcblxuLyo7XG5cdEBvcHRpb246XG5cdFx0e1xuXHRcdFx0XCJyZXNwb25zZTpyZXF1aXJlZFwiOiBcImh0dHAuU2VydmVyUmVzcG9uc2VcIlxuXHRcdFx0XCJwYXRoOnJlcXVpcmVkXCI6IFwic3RyaW5nXCIsXG5cdFx0XHRcInN0YXR1czpyZXF1aXJlZFwiOiBbXG5cdFx0XHRcdFwic3RyaW5nXCIsXG5cdFx0XHRcdFwibnVtYmVyXCJcblx0XHRcdF0sXG5cdFx0XHRcImRhdGFcIjogW1xuXHRcdFx0XHRcInN0cmluZ1wiLFxuXHRcdFx0XHRcIm9iamVjdFwiXG5cdFx0XHRdLFxuXHRcdFx0XCJwZXJtYW5lbnRcIjogXCJib29sZWFuXCJcblx0XHR9XG5cdEBlbmQtb3B0aW9uXG4qL1xuXG5jb25zdCBzZWd3YXkgPSBmdW5jdGlvbiBzZWd3YXkoIG9wdGlvbiApe1xuXHQvKjtcblx0XHRAbWV0YS1jb25maWd1cmF0aW9uOlxuXHRcdFx0e1xuXHRcdFx0XHRcIm9wdGlvblwiOiBcIm9iamVjdFwiXG5cdFx0XHR9XG5cdFx0QGVuZC1tZXRhLWNvbmZpZ3VyYXRpb25cblx0Ki9cblxuXHRsZXQgcmVzcG9uc2UgPSBudWxsO1xuXHRpZiggYXNlYS5zZXJ2ZXIgKXtcblx0XHRyZXNwb25zZSA9IG9wdGlvbi5yZXNwb25zZTtcblxuXHRcdGlmKCBmYWx6ZSggcmVzcG9uc2UgKSB8fFxuXHRcdFx0ISggY2xhem9mKCByZXNwb25zZSwgaHR0cC5TZXJ2ZXJSZXNwb25zZSApICkgKVxuXHRcdHtcblx0XHRcdHRocm93IG5ldyBFcnJvciggXCJpbnZhbGlkIHJlc3BvbnNlXCIgKTtcblx0XHR9XG5cdH1cblxuXHRsZXQgcGF0aCA9IG9wdGlvbi5wYXRoO1xuXHRpZiggIXByb3R5cGUoIHBhdGgsIFNUUklORyApIHx8XG5cdFx0ZmFsenkoIHBhdGggKSApXG5cdHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoIFwiaW52YWxpZCBwYXRoXCIgKTtcblx0fVxuXG5cdGxldCBzdGF0dXMgPSBvcHRpb24uc3RhdHVzO1xuXHRpZiggISggL15cXGR7M30kLyApLnRlc3QoIHN0YXR1cy50b1N0cmluZyggKSApICl7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCBcImludmFsaWQgc3RhdHVzXCIgKTtcblx0fVxuXG5cdGxldCBkYXRhID0gb3B0aW9uLmRhdGE7XG5cdGlmKCBwcm90eXBlKCBkYXRhLCBPQkpFQ1QgKSApe1xuXHRcdHRyeXtcblx0XHRcdGRhdGEgPSBKU09OLnN0cmluZ2lmeSggZGF0YSApO1xuXG5cdFx0fWNhdGNoKCBlcnJvciApe1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKCBcImVycm9yIHN0cmluZ2lmeWluZyBkYXRhXCIsIGVycm9yLm1lc3NhZ2UgKTtcblx0XHR9XG5cdH1cblxuXHRpZiggcHJvdHlwZSggZGF0YSwgU1RSSU5HICkgJiYgdHJ1bHkoIGRhdGEgKSApe1xuXHRcdGlmKCBhc2VhLnNlcnZlciApe1xuXHRcdFx0ZGF0YSA9ICggbmV3IEJ1ZmZlciggZGF0YSApICkudG9TdHJpbmcoIFwiYmFzZTY0XCIgKTtcblxuXHRcdH1lbHNlIGlmKCBhc2VhLmNsaWVudCApe1xuXHRcdFx0ZGF0YSA9IGJ0b2EoIGRhdGEgKTtcblx0XHR9XG5cblx0XHRkYXRhID0gZW5jb2RlVVJJQ29tcG9uZW50KCBkYXRhICk7XG5cblx0fWVsc2V7XG5cdFx0ZGF0YSA9IHVuZGVmaW5lZDtcblx0fVxuXG5cdGxldCByZWRpcmVjdFBhdGggPSBwYXRoICsgc3RhdHVzO1xuXHRpZiggZGF0YSApe1xuXHRcdHJlZGlyZWN0UGF0aCA9IHJlZGlyZWN0UGF0aCArIFwiP2RhdGE9XCIgKyBkYXRhO1xuXHR9XG5cblx0aWYoIGFzZWEuc2VydmVyICl7XG5cdFx0aWYoIG9wdGlvbi5wZXJtYW5lbnQgKXtcblx0XHRcdHJlc3BvbnNlLnJlZGlyZWN0KCAzMDEsIHJlZGlyZWN0UGF0aCApO1xuXG5cdFx0fWVsc2V7XG5cdFx0XHRyZXNwb25zZS5yZWRpcmVjdCggcmVkaXJlY3RQYXRoICk7XG5cdFx0fVxuXG5cdH1lbHNlIGlmKCBhc2VhLmNsaWVudCApe1xuXHRcdHdpbmRvdy5sb2NhdGlvbi5yZXBsYWNlKCByZWRpcmVjdFBhdGggKTtcblx0fVxuXG5cdHJldHVybiByZWRpcmVjdFBhdGg7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHNlZ3dheTtcbiJdfQ==
