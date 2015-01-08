# generator-rf

> RF: a [React](http://facebook.github.io/react/)/[Flux](http://facebook.github.io/flux/) generator with webpack and CoffeeScript/LiveScript + JSX syntax (cjsx) support.


### What's inside
* [React](http://facebook.github.io/react/)
* [Flux](http://facebook.github.io/flux/)
* [Jest](http://facebook.github.io/jest)
* [webpack](http://webpack.github.io/)
* [react-hot-loader](https://gaearon.github.io/react-hot-loader/) that livereload your browser after file change saved.
* JS Dialect you choose in: [CoffeeScript](http://coffeescript.org/), [LiveScript](http://livescript.net) or vanilla JavaScript
* [coffee-react-transform](https://github.com/jsdf/coffee-react-transform) for writing jsx syntax in CoffeeScript/LiveScript
* CSS syntax you choose in: [SASS](http://sass-lang.com/), SCSS (Sassy CSS) or CSS

## Getting Started

### Prerequisites

* [Node.js w/npm](http://nodejs.org/) installed. I recommend installing via [homebrew](http://brew.sh/).
* Have [Yeoman](http://yeoman.io) installed by:

```bash
npm install -g yo@1.3.3
```

> Note: The newest [yo@1.4.0 breaks directly usage from commandline](https://github.com/yeoman/yo/issues/264). Please install 1.3.3 for now, will update once it's fixed.

### Install RF generator

```bash
npm install -g generator-rf
```

### Intiate Project

For example, to create a project name "myapp" , you should make a directory
first.

```bash
mkdir myapp && cd myapp
```

Then initiate project with rf:

```bash
yo rf myapp
```

And you're done! Start a developer server.

```bash
npm run dev
```

Then open [http://localhost:8080](http://localhost:8080) in the browser.

## What RF generates:

    .
    ├── build
    │   ├── bundle.js
    │   └── index.html
    ├── package.json
    ├── preprocessor.js
    ├── node_modules
    ├── src
    │   ├── assets
    │   │   ├── images
    │   │   └── stylesheets
    │   ├── index.html
    │   └── scripts
    │       ├── actions
    │       │   └── __test__
    │       ├── components
    │       │   ├── App.coffee
    │       │   └── __test__
    │       ├── constants
    │       │   └── __test__
    │       ├── dispatcher
    │       │   ├── AppDispatcher.coffee
    │       │   └── __test__
    │       ├── main.coffee
    │       ├── mixins
    │       │   └── __test__
    │       └── stores
    │           └── __test__
    └── webpack.config.js

## Options

### -d: Dialect

By default, RF will generate code in [CoffeeScript](http://coffeescript.org/). If you don't like it, use -d flag to use other dialect.

* `lsc` for [LiveScript](http://livescript.net) (actually `ls` works, too)
* or `js` for JavaScript

Example:

    yo rf myapp -d=lsc

### -s: StyleDialect
RF generate [SASS](http://sass-lang.com/) (indented syntax) by default. Use -s flag to change it.

`scss` for SCSS (Sassy CSS) or `css` for CSS.

Example:

    yo rf myapp -s=scss

## TODO
* Test the generator
* Generate stylesheet and test file
* Store, Component, Actions w/Constants, Mixin generators
* interactive mode when no appName provided

## License

MIT
