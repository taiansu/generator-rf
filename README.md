
## This repo is no longer maintained. Please use Facebook official generator: [create-react-app](https://github.com/facebook/create-react-app) instead.

---

# generator-rf [![Build Status](https://secure.travis-ci.org/taiansu/generator-rf.png?branch=master)](https://travis-ci.org/taiansu/generator-rf) [![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/taiansu/generator-rf?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

> RF: a [React](http://facebook.github.io/react/)/[Flux](http://facebook.github.io/flux/) generator with webpack, dialects and some good stuffs.

### What's inside
* [React](http://facebook.github.io/react/)
* [Flux](http://facebook.github.io/flux/)
* [Jest](http://facebook.github.io/jest)
* [webpack](http://webpack.github.io/)
* SourceMap from webpack's [devtool](http://webpack.github.io/docs/configuration.html#devtool)
* Live-reload by [react-hot-loader](https://gaearon.github.io/react-hot-loader/)
* JS dialect in your favor:
    * ES6 powered by [Babel](https://babeljs.io/) (Formally Javascript 6to5)
    * [CoffeeScript](http://coffeescript.org/)
    * [LiveScript](http://livescript.net)
    * vanilla JavaScript
* Have JSX in CoffeeScript/LiveScript by [coffee-react-transform](https://github.com/jsdf/coffee-react-transform)
* Stylesheet syntax in your favor:
    * [SASS/SCSS](http://sass-lang.com/)
    * [Less](http://lesscss.org/)
    * [Stylus](http://learnboost.github.io/stylus/)
    * pure CSS
* Optional [Bootstrap](http://getbootstrap.com/) Framework

### What 'RF' stands for

No, not the boring abbreviation of "React" and "Flux". It's actually the suffix of `rm -rf`. Now it sounds [dangerous](https://github.com/MrMEEE/bumblebee-Old-and-abbandoned/issues/123) and cooler, doesn't it?

## Installation

### Prerequisites

* [Node.js w/npm](http://nodejs.org/) or [iojs](https://iojs.org/) installed. I
  recommend install it by [nvm](https://github.com/creationix/nvm). Mac user can
  install nvm from [homebrew](http://brew.sh/).

> Note: Jest doesn't work on `io.js` & `node v0.11 ~ v0.12`,
> if you like to have jest works, make sure you use `node.js 4.0` above or `v0.10`

### Install [Yeoman](http://yeoman.io)

```bash
npm install -g yo
```

### Install RF generator

```bash
npm install -g generator-rf
```

## Getting Started

### Intiate Project

For example, to create a project named "myapp", just type:

```bash
yo rf myapp
```

### Run it up

```bash
cd myapp && npm run dev
```

Then Open [http://localhost:8080](http://localhost:8080) in the browser and have fun!

### Run the test suit
Don't forget to test your project by:

```bash
npm test
```

### Build for deploy

```
npm run build
```

## What RF generates:
    .
    └── myapp *
        ├── build
        │   └── index.html
        ├── package.json
        ├── preprocessor.js
        ├── node_modules
        ├── src
        │   ├── assets
        │   │   ├── images
        │   │   └── stylesheets
        │   │       └── style.sass **
        │   └── scripts
        │       ├── actions
        │       │   └── __tests__
        │       ├── components
        │       │   ├── App.js **
        │       │   └── __tests__
        │       ├── constants
        │       │   └── __tests__
        │       ├── dispatcher
        │       │   ├── AppDispatcher.js **
        │       │   └── __tests__
        │       ├── main.js **
        │       ├── mixins
        │       │   └── __tests__
        │       └── stores
        │           └── __tests__
        ├── webpack.dev.config.js
        └── webpack.prod.config.js

* \* Won't create root directory if your current directory is identical with your project name. Check [--skip-root](#--skip-root-dont-create-root-directory) section for detail.
* \*\* Varied by your choices of the dialect and stylesheet syntax


## What `npm run build` gives:
    .
    └── myapp
        ├── build
        │   ├── bundle.js
        │   ├── some bootstrap stuffs (if include)
        │   └── ...
        └── ...

## Options

### --d: Dialect

By default, RF will generate codes in ES6, using [Babel](https://babeljs.io/). If you don't like it, use --d flag to change the dialect to generate.

* `ls` for [LiveScript](http://livescript.net)
* `coffee` for [coffee-script](http://coffeescript.org/)
* `js` for vanilla JavaScript

Example:

    yo rf myapp --d=ls

### --s: Stylesheet Syntax

RF generate [SASS](http://sass-lang.com/) (indented syntax) by default. Use --s flag to change it.

* `scss` for SCSS (Sassy CSS)
* `less` for LESS
* `stylus` for Stylus
* or `css` for CSS.

Example:

    yo rf myapp --s=scss

### --skip-bootstrap: Don't include Bootstrap framework stuffs

RF includes Bootstrap settings in the real __Webpack__ way. Turn them off by --skip-bootstrap flag.

Example:

    yo rf myapp --skip-bootstrap

### --skip-root: Don't create root directory

RF creates a root directory if current directory name is different from your appname, or generate files in current directory if they have same name. But if you're intentionally have them with different name, use --skip-root to generate files right in the current directory.

Example:

    yo rf trueName --skip-root

### --skip-test: Don't create \_\_tests\_\_ directories

For every sub-directories in `src/scripts`, RF will create a \_\_tests\_\_ directory
within. Use `skip-test` to skip that.

Example:

    yo rf myapp --skip-test

### --skip-install: Skip automatic package installation

Example:

    yo rf myapp --skip-install

## Contribute

* Fork this project
* run `npm install && npm test` and make sure all test are pass
* Make your changes with [a bit of test](http://yeoman.io/authoring/testing.html)
* For commit message of pull request, please check [these useful tips](http://robots.thoughtbot.com/5-useful-tips-for-a-better-commit-message) ahead.

## TODO

* PostCSS support
* Actions w/Constants, Store
* Custom template folder
* Component and Mixin generate command
* Isomorphic server script(?)

## License

MIT
