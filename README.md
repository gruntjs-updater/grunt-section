grunt-section
=============

This task is the backbone of [Section](http://section.iclanzan.com), a modular static-site generator that runs on top of Grunt.

## Getting Started
This plugin requires Grunt `~0.4.1`.

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-section --save
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-section');
```

## The "section" task

### Overview
Without installing additional plugins, the only thing this task does is recursively copy all files from `src` to `dest`.

### Usage Example
```js
grunt.initConfig({
  section: {
    target: {
      options: {
        // options depend on the used plugins
      },
      src: 'input/directory/',
      dest: 'output/directory/'
    },
  },
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
### v0.1.0
Initial version
