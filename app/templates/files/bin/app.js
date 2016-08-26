'use strict';

const path = require('path');
const koa = require('koa');
const app = koa();
const Pug = require('koa-pug');
const serve = require('koa-static');

const router = require('../mock/router');
const bodyParser = require('./bodyParser');
const cssInterceptor = require('./cssInterceptor');
const webpack = require('webpack');
const webpackMiddleware = require('koa-webpack-dev-middleware');
const config = require('../webpack.config');

const devPath = path.resolve(__dirname, '../dev');

// set koa subdomainOffset
app.subdomainOffset = 1;

var locals;
switch (app.env) {
    case 'production':
        locals = {
            production: true
        };
        break;
    case 'testing':
        locals = {
            testing: true
        };
        break;
    default:
        locals = {
            development: true
        };
        break;
}

// view engine
const pug = new Pug({
    viewPath: './dev/pugs',
    basedir: './dev/pugs',
    noCache: app.env !== 'production',
    debug: app.env !== 'production',
    app: app,
    locals: locals
});

// body parser
app.use(bodyParser);

// router
app.use(router.routes());

// postcss
app.use(cssInterceptor(devPath));

// js(webpack)
app.use(webpackMiddleware(webpack(config), {
    publicPath: '/script/',
    stats: {
        colors: true
    }
}));

// static, eg: images
app.use(serve(devPath));

app.listen(3000);