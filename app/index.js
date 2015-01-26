'use strict';
var generators = require('yeoman-generator').generators;
var chalk = require('chalk');
var yosay = require('yosay');
var RfHelper = require('./rf-helper.js');

module.exports = RfHelper.extend({

  constructor: function () {
    generators.Base.apply(this, arguments);
    this.argument('appname', { type: String, required: false });

    this.option('d', { type: String,
                       defaults: "coffee",
                       desc: "Dialect: 'ls' for LiveScript, '6to5' for JavaScript-6to5 or 'js' for native JavaScript"
               });

    this.option('s', { type: String,
                       defaults: "sass",
                       desc: "Stylesheet syntax, can be 'scss', 'less', 'stylus' or 'css' "});

    this.option('skip-root', { type: Boolean,
                                defaults: false,
                                desc: "Don't create root directory when current location different from your app name" });

    this.option('skip-test', { type: Boolean,
                               defaults: false,
                               desc: "Don't create __tests__ for every subfolder in src/scripts" });

    this.option('skip-install', { type: Boolean,
                                  defaults: false,
                                  desc: "Skip automatic package installation" });
  },

  initializing: function () {
    this.pkg = require('../package.json');
  },

  prompting: {

    askForAppname: function (){
      if (this.appname) {
        return;
      } else {
        this.interactive = true;
      };

      var done = this.async();

      this.log(yosay("Greetings. I'm " + chalk.blue('RF') + ", here to generate a nice, well structured react/flux webapp for you."));
      this.log("Please kindly answer my few questions.\n");

      this.prompt({
        type: 'input',
        name: 'appname',
        message: 'So your webapp name is?',
        default: 'MyWebApp'
      }, function(answers) {
        this.log('\nAh, ' + chalk.yellow(answers.appname) + ', sounds will be an awesome project.\n');
        this.appname = answers.appname;
        done();
      }.bind(this));
    },

    askForDialect: function () {
      if ( !this.interactive ) {
        return;
      }
      var done = this.async();

      this.prompt({
        type: 'input',
        name: 'dialect',
        message: 'So which JavaScript dialect you like in: ' + chalk.blue('coffee, ls, 6to5 or js') + ' ?',
        default: 'coffee'
      }, function(answers) {
        this.log('\nExcellent, I like ' + chalk.yellow(answers.dialect) + ', too.\n');
        this.options.d = answers.dialect;
        done();
      }.bind(this));
    },

    askForStyle: function () {
      if ( !this.interactive ) {
        return;
      }
      var done = this.async();

      this.prompt({
        type: 'input',
        name: 'style',
        message: 'So which css syntax you like in: ' + chalk.blue('sass, scss, less, stylus or css') + ' ?',
        default: 'sass'
      }, function(answers) {
        this.log( "\n" + chalk.yellow(answers.style) + ", nice choice.\n");
        this.log(chalk.bold.black.bgYellow("Your webapp will be served soon.") + "\n");
        this.options.s = answers.style;
        done();
      }.bind(this));
    }
  },

  configuring: {
    changeRoot: function () {
      if (this.isCwd(this.appname) || this.options.skipRoot) {
        return;
      }

      this.makeRoot(this.appname);
      this.destinationRoot(this.appname);
      this.chdir = true;
    },

    setConfig: function () {
      this.config.set('appname', this.appname);
      this.config.set('mkTestDirs', !this.options.skipTest);
      this.setDialect(this.options.d);
      this.setStylesheet(this.options.s);
      this.setEnv();
    }
  },

  writing: {
    app: function () {
      this.copyConfigFiles();
      this.copyHTML();
      this.mkDirs();
      this.copyScripts();
      this.copyStylesheets();
    },

    projectfiles: function () {
      var self = this;
      this._.each([".editorconfig", ".jshintrc", ".gitignore"], function (file) {
        self.fs.copy(
          self.templatePath(file.replace(/\./, "")),
          self.destinationPath(file)
        );
      });
    }
  },

  install: function () {
    this.installDependencies({
      bower: false,
      skipInstall: this.options.skipInstall,
      callback: function() {
        this.log("\n" + chalk.bold("Here is your webapp. Enjoy."));
        var chdirCmd = this.chdir ? "cd " + this.appname + " && " : "";
        this.log('Run ' + chalk.bold.green(chdirCmd + "npm run dev") + ' to strat up your app.');
      }.bind(this)
    });
  }
});
