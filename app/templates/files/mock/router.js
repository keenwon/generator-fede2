'use strict';

const subdomain = require('koa-subdomain')();

const channel1Router = require('./channel1/router');
const channel2Router = require('./channel2/router');

subdomain.use('channel1', channel1Router.routes());
subdomain.use('channel2', channel2Router.routes());

module.exports = subdomain;