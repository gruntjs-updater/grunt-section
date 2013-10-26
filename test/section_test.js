'use strict';

var path = require('path');
var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.section = {
  'File Structure': function (test) {
    test.expect(1);

    var output = [];
    grunt.file.recurse('tmp', function (abs, root, subdir, file) {
      output.push(path.join(subdir || '', file));
    });
    output.sort();

    var expected = [];
    grunt.file.recurse('test/expected', function (abs, root, subdir, file) {
      expected.push(path.join(subdir || '', file));
    });
    expected.sort();

    test.deepEqual(output, expected, 'Expected different file structure.');

    test.done();
  }
};
