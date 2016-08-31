'use strict';

const path = require('path');
const koa = require('koa');
const app = koa();
const Pug = require('koa-pug');
const serve = require('koa-static');

const config = require('../config');
const router = require('../mock/router');
const bodyParser = require('./bodyParser');
const cssInterceptor = require('./cssInterceptor');
const webpack = require('webpack');
const webpackMiddleware = require('koa-webpack-dev-middleware');
const webpackConfig = require('../webpack.config');

const devPath = path.resolve(__dirname, '../dev');

// set koa subdomainOffset
app.subdomainOffset = 1;

// view engine
const pug = new Pug({
    viewPath: './dev/pugs',
    basedir: './dev/pugs',
    noCache: app.env !== 'production',
    debug: app.env !== 'production',
    app: app,
    locals: {
        development: app.env === 'development',
        testing: app.env === 'testing',
        production: app.env === 'production',
        cdn: config.cdn
    }
});

// body parser
app.use(bodyParser);

// router
app.use(router.routes());

// postcss
app.use(cssInterceptor(devPath));

// js(webpack)
app.use(webpackMiddleware(webpack(webpackConfig), {
    publicPath: '/script/',
    stats: {
        colors: true
    }
}));

// static, eg: images
app.use(serve(devPath));

app.listen(3000);