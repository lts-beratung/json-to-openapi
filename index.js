'use strict';

const refParser = require('json-schema-ref-parser');
const toOpenApi = require('json-schema-to-openapi-schema');

module.exports = input => {
	return refParser.dereference(input)
		.then(schema => {
			return toOpenApi(schema);
		})
		.catch(err => {
			console.error('Error parsing refs: ' + err);
		});
};
