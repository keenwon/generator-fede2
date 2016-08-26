'use strict';

const router = require('koa-router')();

/**
 * Pages
 */

// 首页
router.get('/', function *() {
    this.render('channel2/index');
});

module.exports = router;