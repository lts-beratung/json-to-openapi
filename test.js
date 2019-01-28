import fs from 'fs';
import test from 'ava';
import jsonToOpenapi from '.';

test('Basic test', async t => {
	const actual = JSON.stringify(await Promise.resolve(
		jsonToOpenapi('test/test.json')), null, 2);
	const expected = fs.readFileSync(
		'test/test-res.json', 'utf8').toString();
	// Previously saved output comes with an extra
	// newline, and that was the solution i came
	// up with :)
	t.true(actual + '\n' === expected);
});

test('Dereference test', async t => {
	const actual = JSON.stringify(await Promise.resolve(
		jsonToOpenapi('test/test-2.json')), null, 2);
	const expected = fs.readFileSync(
		'test/test-2-res.json', 'utf8').toString();
	t.true(actual + '\n' === expected);
});
