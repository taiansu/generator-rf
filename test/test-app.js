'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');
var fs = require('fs');

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

    it('create and change destinationRoot', function () {
      assert.ok(process.cwd().match(/MyApp/));
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

    it('generate package.json with base, coffee and sass devDependencies', function () {
      assert.fileContent('package.json', /react-tools/);
      assert.fileContent('package.json', /coffee-script/);
      assert.fileContent('package.json', /sass-loader/);
    });

    it('generate package.json with "js" and "coffee" in testFileExtensions', function () {
      assert.fileContent('package.json', /"testFileExtensions": \[[\s\S]*"js",[\s\S]*"coffee"[\s\S]\]/m);
    });

    it('generate webpack.config.js with coffee-script loader', function () {
      assert.fileContent('webpack.config.js', /coffee!cjsx/);
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

    it('generate package.json with base and LiveScript devDependencies', function () {
      assert.fileContent('package.json', /react-tools/);
      assert.fileContent('package.json', /LiveScript/);
    });

    it('generate webpack.config.js with LiveScript loader', function () {
      assert.fileContent('webpack.config.js', /livescript!cjsx/);
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

    it('generate package.json with base and JavaScript devDependencies', function () {
      assert.fileContent('package.json', /react-tools/);
      assert.fileContent('package.json', /jsx-loader/);
    });

    it('generate webpack.config.js with JavaScript loader', function () {
      assert.fileContent('webpack.config.js', /jsx/);
    });

  });

  ////////////
  //  Babel //
  ////////////

  describe('Babel', function () {
    before(function (done) {
       helpers.run(path.join(__dirname, '../app'))
         .inDir(path.join(os.tmpdir(), './temp-test'))
         .withArguments(['MyApp'])
         .withOptions({ 'd': 'babel', 'skipInstall': true })
         .on('end', done);
    });

    it('creates general files', function () {
      assert.file(generalFiles);
    });

    it('creates Babel files', function () {
      assert.file([
        'src/scripts/main.js',
        'src/scripts/components/App.js',
        'src/scripts/components/__tests__/App-test.js',
        'src/scripts/dispatcher/AppDispatcher.js'
      ]);
    });

    it('save configs of Babel', function () {
      assert.fileContent('.yo-rc.json', /"dialect": "Babel"/);
      assert.fileContent('.yo-rc.json', /"scriptSuffix": ".js"/);
    });

    it('generate package.json with base and Babel devDependencies', function () {
      assert.fileContent('package.json', /react-tools/);
      assert.fileContent('package.json', /jsx-loader/);
      assert.fileContent('package.json', /babel-loader/);
    });

    it('generate webpack.config.js with Babel loader', function () {
      assert.fileContent('webpack.config.js', /babel/);
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

    it('generate package.json with base and SCSS devDependencies', function () {
      assert.fileContent('package.json', /react-tools/);
      assert.fileContent('package.json', /sass-loader/);
    });

    it('creates sass files', function () {
      assert.file('src/assets/stylesheets/style.scss');
    });

    it('generate webpack.config.js with scss loader', function () {
      assert.fileContent('webpack.config.js', /style!css!sass\?outputStyle=expanded/);
    });

  });

  ////////////
  //  Less  //
  ////////////

  describe('Less', function() {
    before(function (done) {
       helpers.run(path.join(__dirname, '../app'))
         .inDir(path.join(os.tmpdir(), './temp-test'))
         .withArguments(['MyApp'])
         .withOptions({ 's': 'less', 'skipInstall': true })
         .on('end', done);
    });

    it('save configs of Less', function () {
      assert.fileContent('.yo-rc.json', /"stylesheet": "Less"/);
      assert.fileContent('.yo-rc.json', /"stylesheetSuffix": ".less"/);
    });

    it('generate package.json with base and Less devDependencies', function () {
      assert.fileContent('package.json', /react-tools/);
      assert.fileContent('package.json', /less-loader/);
    });

    it('creates less files', function () {
      assert.file('src/assets/stylesheets/style.less');
    });

    it('generate webpack.config.js with less loader', function () {
      assert.fileContent('webpack.config.js', /style!css!less/);
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

    it('save configs of Less', function () {
      assert.fileContent('.yo-rc.json', /"stylesheet": "CSS"/);
      assert.fileContent('.yo-rc.json', /"stylesheetSuffix": ".css"/);
    });

    it('creates css files', function () {
      assert.file('src/assets/stylesheets/style.css');
    });

    it('generate webpack.config.js with css loader', function () {
      assert.fileContent('webpack.config.js', /style!css[^!]/);
    });

  });

  //////////////
  //  Stylus  //
  //////////////

  describe('Stylus', function() {
    before(function (done) {
       helpers.run(path.join(__dirname, '../app'))
         .inDir(path.join(os.tmpdir(), './temp-test'))
         .withArguments(['MyApp'])
         .withOptions({ 's': 'stylus', 'skipInstall': true })
         .on('end', done);
    });

    it('save configs of Stylus', function () {
      assert.fileContent('.yo-rc.json', /"stylesheet": "Stylus"/);
      assert.fileContent('.yo-rc.json', /"stylesheetSuffix": ".styl"/);
    });

    it('creates css files', function () {
      assert.file('src/assets/stylesheets/style.styl');
    });

    it('generate webpack.config.js with Stylus loader', function () {
      assert.fileContent('webpack.config.js', /style!css!stylus/);
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

  ////////////////
  //  skipRoot  //
  ////////////////

  describe('skipRoot', function () {
    before(function (done) {
       helpers.run(path.join(__dirname, '../app'))
         .inDir(path.join(os.tmpdir(), './temp-test'))
         .withArguments(['MyApp'])
         .withOptions({ 'skipRoot': true, 'skipInstall': true })
         .on('end', done);
    });

    it('don\'t create destinationRoot', function () {
      assert.equal(process.cwd().match(/MyApp/), null);
    });

    it('Use temp-test as destinationRoot', function () {
      assert.ok(process.cwd().match(/temp-test/));
    });

    it('creates general files', function () {
      assert.file(generalFiles);
    });

  });

  describe('Directory name as same as App name', function () {
    before(function (done) {
       helpers.run(path.join(__dirname, '../app'))
         .inDir(path.join(os.tmpdir(), './MyApp'))
         .withArguments(['MyApp'])
         .withOptions({ 'skipInstall': true })
         .on('end', done);
    });

    it('don\'t create destinationRoot', function () {
      assert.equal(process.cwd().match(/MyApp\/MyApp$/), null);
    });

    it('creates general files', function () {
      assert.file(generalFiles);
    });

  });

  ////////////////////////////////////
  //  Generated valid package.json  //
  ////////////////////////////////////

  describe('Package.json', function () {

    before(function (done) {
      helpers.run(path.join(__dirname, '../app'))
        .inDir(path.join(os.tmpdir(), './temp-test'))
        .withArguments(['MyApp'])
        .withOptions({ 'skipInstall': true })
        .on('end', done);
    });

    function isValidJSON (jsonString) {
      try {
        JSON.parse(jsonString);
      } catch (e) {
        return false;
      }
      return true;
    }

    it('is a valid JSON', function () {
      var text = fs.readFileSync('package.json', 'utf8');
      assert.equal(isValidJSON(text), true);
    })

  })

});
