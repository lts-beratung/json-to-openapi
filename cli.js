#!/usr/bin/env node
'use strict';
const meow = require('meow');
const jsonToOpenapi = require('.');

const cli = meow(`
  Usage
    json-to-openapi filename

  Examples
    $ json-to-openapi schema.json
		// > Converts the json schema stored under schema.json to an openapi schema.
`);

jsonToOpenapi(cli.input[0]).then(schema =>
	console.log(JSON.stringify(schema, null, 2))
);
