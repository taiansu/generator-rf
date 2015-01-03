# generator-rf

> RF: a [React](http://facebook.github.io/react/)/[Flux](http://facebook.github.io/flux/) generator with webpack and CoffeeScript/LiveScript support.

### What's inside
* [React](http://facebook.github.io/react/)
* [Flux](http://facebook.github.io/flux/)
* [Jest](http://facebook.github.io/jest)
* [Webpack](http://webpack.github.io/)
* JS Dialect you choose in: [CoffeeScript](http://coffeescript.org/), [LiveScript](http://livescript.net) or vanilla JavaScript
* CSS syntax you choose in: [SASS](http://sass-lang.com/) or SCSS (Sassy CSS) or CSS

## Getting Started

### Prerequisites

* [Node.js w/npm](http://nodejs.org/) installed. I recommend installing via [homebrew](http://brew.sh/).
* Have [Yeoman](http://yeoman.io) installed by:

```bash
npm install -g yo
```
### Install RF generator

```bash
npm install -g generator-rf
```

Finally, initiate the generator:

```bash
yo rf --help
```

## Options

### -d: Dialect

By default, RF will generate code in [CoffeeScript](http://coffeescript.org/). If you don't like it, use -d flag to use other dialect.

`lsc` for [LiveScript](http://livescript.net) or `js` for JavaScript.

Example:

    yo rf myapp -d=lsc

### -s: StyleDialect
RF generate [SASS](http://sass-lang.com/) (indented syntax) by default. Use -s flag to change it.

`scss` for SCSS (Sassy CSS) or `css` for CSS.

Example:

    yo rf myapp -s=scss


## TODO
* interactive mode when no appname provided
* Store, Component, Actions w/Constants, Mixin generators

## License

MIT
