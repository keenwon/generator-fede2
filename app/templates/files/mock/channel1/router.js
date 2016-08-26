'use strict';

const router = require('koa-router')();

/**
 * Pages
 */

// 首页
router.get('/', function *() {
    this.render('channel1/index');
});

module.exports = router;