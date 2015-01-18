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

  describe('Default: CoffeeScript & SASS', function() {
    before(function (done) {
       helpers.run(path.join(__dirname, '../app'))
         .inDir(path.join(os.tmpdir(), './temp-test'))
         .withArguments(['MyApp'])
         .withOptions({ 'skipInstall': true })
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

    it('creates sass files', function () {
      assert.file('src/assets/stylesheets/style.sass');
    });

    it('save configs of coffee-script and SASS', function () {
      assert.fileContent('.yo-rc.json', /"dialect": "coffee-script"/);
      assert.fileContent('.yo-rc.json', /"scriptSuffix": ".coffee"/);
      assert.fileContent('.yo-rc.json', /"stylesheet": "SASS"/);
      assert.fileContent('.yo-rc.json', /"stylesheetSuffix": ".sass"/);
    });

    it('generact package.json with base, coffee and sass devDependencies', function () {
      assert.fileContent('package.json', /react-tools/);
      assert.fileContent('package.json', /coffee-script/);
      assert.fileContent('package.json', /sass-loader/);
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
         .withOptions({ 'd': 'ls', 'skipInstall': true })
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

    it('save configs of LiveScript', function () {
      assert.fileContent('.yo-rc.json', /"dialect": "LiveScript"/);
      assert.fileContent('.yo-rc.json', /"scriptSuffix": ".ls"/);
    });

    it('generact package.json with base and LiveScript devDependencies', function () {
      assert.fileContent('package.json', /react-tools/);
      assert.fileContent('package.json', /LiveScript/);
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
         .withOptions({ 'd': 'js', 'skipInstall': true })
         .on('end', done);
    });

    it('creates general files', function () {
      assert.file(generalFiles);
    });

    it('creates JavaScript files', function () {
      assert.file([
        'src/scripts/main.js',
        'src/scripts/components/App.js',
        'src/scripts/components/__tests__/App-test.js',
        'src/scripts/dispatcher/AppDispatcher.js'
      ]);
    });

    it('save configs of JavaScript', function () {
      assert.fileContent('.yo-rc.json', /"dialect": "JavaScript"/);
      assert.fileContent('.yo-rc.json', /"scriptSuffix": ".js"/);
    });

    it('generact package.json with base and JavaScript devDependencies', function () {
      assert.fileContent('package.json', /react-tools/);
      assert.fileContent('package.json', /jsx-loader/);
    });
  });

  ////////////
  //  SCSS  //
  ////////////

  describe('SCSS', function() {
    before(function (done) {
       helpers.run(path.join(__dirname, '../app'))
         .inDir(path.join(os.tmpdir(), './temp-test'))
         .withArguments(['MyApp'])
         .withOptions({ 's': 'scss', 'skipInstall': true })
         .on('end', done);
    });

    it('save configs of SCSS', function () {
      assert.fileContent('.yo-rc.json', /"stylesheet": "SCSS"/);
      assert.fileContent('.yo-rc.json', /"stylesheetSuffix": ".scss"/);
    });

    it('generact package.json with base and SCSS devDependencies', function () {
      assert.fileContent('package.json', /react-tools/);
      assert.fileContent('package.json', /sass-loader/);
    });

    it('creates sass files', function () {
      assert.file('src/assets/stylesheets/style.scss');
    });

  });

  ////////////
  //  LESS  //
  ////////////

  describe('LESS', function() {
    before(function (done) {
       helpers.run(path.join(__dirname, '../app'))
         .inDir(path.join(os.tmpdir(), './temp-test'))
         .withArguments(['MyApp'])
         .withOptions({ 's': 'less', 'skipInstall': true })
         .on('end', done);
    });

    it('save configs of LESS', function () {
      assert.fileContent('.yo-rc.json', /"stylesheet": "LESS"/);
      assert.fileContent('.yo-rc.json', /"stylesheetSuffix": ".less"/);
    });

    it('generact package.json with base and SCSS devDependencies', function () {
      assert.fileContent('package.json', /react-tools/);
      assert.fileContent('package.json', /less-loader/);
    });

    it('creates less files', function () {
      assert.file('src/assets/stylesheets/style.less');
    });

  });

  ///////////
  //  CSS  //
  ///////////

  describe('CSS', function() {
    before(function (done) {
       helpers.run(path.join(__dirname, '../app'))
         .inDir(path.join(os.tmpdir(), './temp-test'))
         .withArguments(['MyApp'])
         .withOptions({ 's': 'css', 'skipInstall': true })
         .on('end', done);
    });

    it('save configs of LESS', function () {
      assert.fileContent('.yo-rc.json', /"stylesheet": "CSS"/);
      assert.fileContent('.yo-rc.json', /"stylesheetSuffix": ".css"/);
    });

    it('creates css files', function () {
      assert.file('src/assets/stylesheets/style.css');
    });

  });

  ////////////////
  //  skipTest  //
  ////////////////

  describe('skipTest', function () {
    before(function (done) {
       helpers.run(path.join(__dirname, '../app'))
         .inDir(path.join(os.tmpdir(), './temp-test'))
         .withArguments(['MyApp'])
         .withOptions({ 'skipTest': true, 'skipInstall': true })
         .on('end', done);
    });

    it('creates implementation files', function () {
      assert.file([
        'src/scripts/main.coffee',
        'src/scripts/components/App.coffee',
        'src/scripts/dispatcher/AppDispatcher.coffee'
      ]);
    });

    it('doesn\'t create __tests__ directory and file', function () {
      assert.noFile('src/scripts/components/__tests__/App-test.coffee');
    });

  });
});
