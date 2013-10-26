/*
 * grunt-section
 * https://github.com/iclanzan/grunt-section
 *
 * Copyright (c) 2013 Sorin Iclanzan
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {
  var _ = grunt.util._;

  function addChild(props) {
    var page = Object.create(this._proto);
    page.page = page;
    page.children = [];
    page.files = [];
    page.pages.push(page);
    page.depth = this.depth + 1;

    if (this == this._proto) {
      page.parent = null;
    }
    else {
      page.parent = this;
      this.children.push(page);
    }

    // Clone array
    page.ancestors = this.ancestors.slice(0);
    page.ancestors.push(page);

    return _.extend(page, props);
  }

  return function tree(proto, props) {
    proto._proto = proto;
    proto.addChild = addChild;
    proto.pages = [];
    proto.ancestors = [];
    proto.depth = -1;

    return proto.root = proto.addChild(props);
  };
};
