'use strict';

module.exports = function (str) {
    return $.trim(str)
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
};