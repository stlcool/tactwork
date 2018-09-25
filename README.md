# Custom made SASS workflow based off of Google's web starter kit. This version has bootstrap sass baked into it.

## Dependencies

The dependencies are:
* [Node.js](http://nodejs.org)
* [Ruby](https://www.ruby-lang.org/)
* [gulp.js](http://gulpjs.com)
* [Sass](http://sass-lang.com/install)

### Node

Bring up a terminal and type `node --version`.
If Node responds with a version at or above v0.10.x then check for a [Ruby](#ruby) installation.
If you require Node, go to [nodejs.org](http://nodejs.org/) and click on the big green Install button.

### Ruby

Bring up a terminal and type `ruby --version`.
If Ruby responds with a version number at or above 1.8.7 then type `gem --version`.
If you don't see any errors then you may proceed looking for [Sass](#sass).
If you require Ruby, it can be installed from the [Ruby downloads](https://www.ruby-lang.org/en/downloads/) page.

### Sass

Make sure you have [Ruby](#ruby) installed before proceeding.
Bring up a terminal and type `sass --version`.
If Sass is installed it should return a version number at or above 3.3.x.
If you don't see any errors, proceed to check for [gulp](#gulp).
If you need to install Sass, see the command-line instructions on the [Sass installation](http://sass-lang.com/install) page.

### Gulp

Bring up a terminal and type `gulp --version`.
If Gulp is installed it should return a version number at or above 3.5.x.
If you need to install Gulp, open up a terminal and type in the following:

```sh
$ npm install --global gulp
```

This will install Gulp globally. Depending on your user account, you may need to gain elevated permissions using `sudo` (i.e `sudo npm install --global gulp`). Next, install the local dependencies Web Starter Kit requires:

```sh
$ sudo npm install

## Commands
here are many commands available to help you build and test sites. Here are a few highlights to get started with.

### Watch For Changes & Automatically Refresh Across Devices

```sh
$ gulp serve
```

This outputs an IP address you can use to locally test and another that can be used on devices connected to your network.

### Build & Optimize

```sh
$ gulp
```

Build and optimize the current project, ready for deployment.
This includes linting as well as image, script, stylesheet and HTML optimization and minification.

### Performance Insights

```sh
$ gulp pagespeed
```

Runs the deployed (public) version of your site against the [PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights/) API to help you stay on top of where you can improve.

## Extras

Optional additions, such as web server configurations, can be found at [WSK Extras
repository](https://github.com/google/web-starter-kit-extras).

## Inspiration

Web Starter Kit is inspired by [Mobile HTML5 Boilerplate](http://html5boilerplate.com/mobile/) and Yeoman's [generator-gulp-webapp](https://github.com/yeoman/generator-gulp-webapp), having taken input from contributors to both projects during development. Our [FAQs](https://github.com/google/web-starter-kit/wiki/FAQ) attempt to answer commonly asked questions about the project.


## License

Apache 2.0
Copyright 2014 Google Inc
