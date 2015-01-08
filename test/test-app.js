'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');

describe('rf:app', function () {
  var generalFiles = [
    'package.json',
    '.editorconfig',
    '.jshintrc',
    '.yo-rc.json',
    'preprocessor.js',
    'webpack.config.js',
    'src/index.html'
  ];

  ////////////////////
  //  CoffeeScript  //
  ////////////////////

  describe('CoffeeScript', function() {
    before(function (done) {
       helpers.run(path.join(__dirname, '../app'))
         .inDir(path.join(os.tmpdir(), './temp-test'))
         .withArguments(['MyApp'])
         .withOptions({ 'skip-install': true })
         .on('end', done);
    });

    it('creates general files', function () {
      assert.file(generalFiles);
    });

    it('creates CoffeeScript files', function () {
      assert.file([
        'src/scripts/main.coffee',
        'src/scripts/components/App.coffee',
        'src/scripts/components/__tests__/App-test.coffee',
        'src/scripts/dispatcher/AppDispatcher.coffee'
      ]);
    });

    it('save config with coffee and SASS', function () {
      assert.fileContent('.yo-rc.json', /"dialect": "coffee-script"/);
      assert.fileContent('.yo-rc.json', /"stylesheetSyntax": "SASS"/);
      assert.fileContent('.yo-rc.json', /"stylesheetSuffix": ".sass"/);
    });
  });

  //////////////////
  //  LiveScript  //
  //////////////////

  describe('LiveScript', function () {
    before(function (done) {
       helpers.run(path.join(__dirname, '../app'))
         .inDir(path.join(os.tmpdir(), './temp-test'))
         .withArguments(['MyApp'])
         .withOptions({ 'd': 'ls', 's': 'scss', 'skip-install': true })
         .on('end', done);
    });

    it('creates general files', function () {
      assert.file(generalFiles);
    });

    it('creates LiveScript files', function () {
      assert.file([
        'src/scripts/main.ls',
        'src/scripts/components/App.ls',
        'src/scripts/components/__tests__/App-test.ls',
        'src/scripts/dispatcher/AppDispatcher.ls'
      ]);
    });

    it('save config with LiveScript and SCSS', function () {
      assert.fileContent('.yo-rc.json', /"dialect": "LiveScript"/);
      assert.fileContent('.yo-rc.json', /"stylesheetSyntax": "SCSS"/);
      assert.fileContent('.yo-rc.json', /"stylesheetSuffix": ".scss"/);
    });
  });

  //////////////////
  //  JAVASCRIPT  //
  //////////////////

  describe('JavaScript', function () {
    before(function (done) {
       helpers.run(path.join(__dirname, '../app'))
         .inDir(path.join(os.tmpdir(), './temp-test'))
         .withArguments(['MyApp'])
         .withOptions({ 'd': 'js', 's': 'css', 'skip-install': true })
         .on('end', done);
    });

    it('creates general files', function () {
      assert.file(generalFiles);
    });

    it('creates LiveScript files', function () {
      assert.file([
        'src/scripts/main.js',
        'src/scripts/components/App.js',
        'src/scripts/components/__tests__/App-test.js',
        'src/scripts/dispatcher/AppDispatcher.js'
      ]);
    });

    it('save config with JavaScript and CSS', function () {
      assert.fileContent('.yo-rc.json', /"dialect": "JavaScript"/);
      assert.fileContent('.yo-rc.json', /"stylesheetSyntax": "CSS"/);
      assert.fileContent('.yo-rc.json', /"stylesheetSuffix": ".css"/);
    });
  });
});
