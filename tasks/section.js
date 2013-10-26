/*
 * grunt-section
 * https://github.com/iclanzan/grunt-section
 *
 * Copyright (c) 2013 Sorin Iclanzan
 * Licensed under the MIT license.
 */

'use strict';

// Node modules
var path = require('path');
var fs = require('fs');

module.exports = function (grunt) {

  var tree = require('./lib/tree')(grunt);

  // Aliases
  var evt = grunt.event;
  var file = grunt.file;
  var copyFile = file.copy;
  var writeFile = file.write;
  var _ = grunt.util._;
  var propExists = grunt.util.namespace.exists;

  grunt.registerMultiTask('section', 'Static site generator with an attitude.', function () {
    var task = this;
    var options = task.options();
    var src = options.src = task.data.src;
    var dest = options.dest = task.data.dest;

    options.pagePrototype = {
      options: options,
      _: _,
      has: function () {
        var keys = Array.prototype.slice.call(arguments);
        return function (page) {
          return keys.every(function (key) {
            return propExists(page, key);
          });
        };
      }
    };
    evt.emit(['section', 'init'], options);

    var root = tree(options.pagePrototype);

    // Build the content tree
    (function recurse(dir, node) {
      fs.readdirSync(dir).forEach(function (filename) {
        // Skip filenames beginning with an underscore or dot.
        if (filename.charAt(0) == '_' || filename.charAt(0) == '.') {
          return;
        }

        var fileSrc = path.join(dir, filename);
        var stat = fs.statSync(fileSrc);
        var isDir = stat.isDirectory();
        var isFile = stat.isFile();

        // Skip everything other than directories and regular files
        if (!isDir && !isFile) {
          return;
        }

        var rel = path.relative(src, fileSrc);
        var ext = path.extname(filename);
        var name = path.basename(filename, ext);
        ext = _.ltrim(ext, '.');

        var file = {
          src: fileSrc,
          rel: rel,
          stat: stat,
          ext: ext,
          name: name
        };

        if (isDir) {
          var child = node.addChild();
          evt.emit(['section', 'directory'], file, child);
          recurse(fileSrc, child);
        }

        else if (isFile) {
          file.dest = path.join(dest, rel);
          evt.emit(['section', 'file'], file, node);
          if (!file.discard) {
            node.files.push(file);
          }
        }
      });
    })(src, root);

    evt.emit(['section', 'tree'], root);

    root.pages.forEach(function (page) {
      evt.emit(['section', 'render'], page);
      if (page.dest && page.body) {
        evt.emit(['section', 'write'], page);
        writeFile(page.dest, page.body);
      }
      page.files.forEach(function (file) {
        evt.emit(['section', 'copy'], file, page);
        copyFile(file.src, file.dest);
      });
    });

    // Done!
    evt.emit(['section', 'done'], root);
  });
};
