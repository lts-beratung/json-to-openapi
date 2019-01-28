# json-to-openapi [![Build Status](https://travis-ci.org/vikepic/json-to-openapi.svg?branch=master)](https://travis-ci.org/vikepic/json-to-openapi)

> A small cli application to convert json schemas to openapi schemas.

Using both [json-schema-ref-parser](https://www.npmjs.com/package/json-schema-ref-parser) and [json-schema-to-openapi schema](https://github.com/wework/json-schema-to-openapi-schema).

# Features

Please read the documentation for [json-schema-ref-parser](https://www.npmjs.com/package/json-schema-ref-parser) and [json-schema-to-openapi schema](https://github.com/wework/json-schema-to-openapi-schema#features) to get a complete list of all the features available.

# Install

```
$ npm install --global json-to-openapi
```

```
$ json-to-openapi --help

Usage
json-to-openapi filename

Examples
$ json-to-openapi schema.json
// > Converts the json schema stored under schema.json to an openapi schema.
```

# Examples

Basic use case where one wants to convert a json schema stored under schema.json to an openapi schema:

```
// schema.json
{
	"$schema": "http://json-schema.org/draft-06/schema#",
		"description": "A customer schema",
		"type": "object",
		"required": [
			"id"
		],
		"properties": {
			"id": {
				"type": "string",
				"description": "Customer ID"
			},
			"firstName": {
				"type": "string",
				"description": "First name of a customer"
			},
			"lastName": {
				"type": "string",
				"description": "Last name of a customer"
			}
		}
}
```

After conversion with `json-to-openapi schema.json`:

```
{
	"description": "A customer schema",
		"type": "object",
		"required": [
			"id"
		],
		"properties": {
			"id": {
				"type": "string",
				"description": "Customer ID"
			},
			"firstName": {
				"type": "string",
				"description": "First name of a customer"
			},
			"lastName": {
				"type": "string",
				"description": "Last name of a customer"
			}
		}
}
```

It also dereferences `$ref` keywords, thanks to [json-schema-ref-parser](https://www.npmjs.com/package/json-schema-ref-parser). An example of how would that work can be found below:

```
// schema.json
{
	// ...
	"properties": {
		// ...
		"emails": {
			"type": "array",
				"description": "All emails of the customer",
				"items": {
					"$ref": "#/definitions/email"
				}
		}
	},
		"definitions": {
			"email": {
				"type": "object",
				"additionalProperties": false,
				"properties": {
					"id": {
						"type": "string",
						"description": "Identifier of the email"
					},
					"mail": {
						"type": "string",
						"description": "Mail address"
					}
				}
			}
		}
}
```

After the conversion:

```
{
	// ...
	"properties": {
		// ...
		"emails": {
			"type": "array",
				"description": "All emails of the customer",
				"items": {
					"type": "object",
					"additionalProperties": false,
					"properties": {
						"id": {
							"type": "string",
							"description": "Identifier of the email"
						},
						"mail": {
							"type": "string",
							"description": "Mail address"
						}
					}
				}
		}
	},
		"definitions": {
			"email": {
				// ...
			}
		}
}
```

# See also

* [json-schema-ref-parser](https://www.npmjs.com/package/json-schema-ref-parser)
* [json-schema-to-openapi schema](https://github.com/wework/json-schema-to-openapi-schema)

## License

MIT © [vikepic](https://vikepic.github.io)
