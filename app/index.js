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

  prompting: function () {
    if ( this.appname ) {
      return;
    };

    this.greeting();
    this.askForAppname();
    this.askForDialect();
    this.askForStyle();
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
