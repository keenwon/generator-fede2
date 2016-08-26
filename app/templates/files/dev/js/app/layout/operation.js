'use strict';

var autoAddArgu = require('utils/autoAddArgu');

var app = {

    sidObj: {},
    sidArray: [],

    init: function () {
        var self = this;

        // ready后立即注册全局对象，一定程度上防止其他js使用sidObj对象时报错
        window.sidObj = {};

        self.initEvent();
        self.exec();
        autoAddArgu();
    },

    exec: function () {
        var self = this;

        self._getSid();
        self._getSourceId();
    },

    _getSid: function () {
        var self = this,
            $t, sid;

        self.sidArray = [];

        $('[operation-sid]').each(function () {
            $t = $(this);
            sid = $t.attr('operation-sid');

            if (!(sid in self.sidObj)) {
                self.sidObj[sid] = '';
            }
            // 同一个sid，可能有的是同步输出在jsp的，有的是异步js插入的，所以还要再查询一次
            self.sidArray.push(sid);
        });
    },

    _getSourceId: function () {
        var self = this,
            url, sid, sourceId;

        try {
            url = urlConfig.source;
        } catch (e) {
            url = sourceApi;
        }

        if (!url) {
            return;
        }

        $.ajax({
            url: url,
            dataType: 'jsonp',
            data: {
                sid: self.sidArray.join(',')
            },
            success: function (res) {
                if (res.errcode !== 0) {
                    return;
                }

                for (var i = 0, j = res.data.length; i < j; i++) {
                    sid = res.data[i].sid;
                    sourceId = res.data[i].source_id;

                    if (sourceId) {
                        self.sidObj[sid] = sourceId;
                    } else {
                        $('[operation-sid="' + sid + '"]').removeAttr('operation-sid');
                        delete self.sidObj[sid];
                    }
                }

                window.sidObj = self.sidObj;
                self._setElementArgu();
            }
        });
    },

    _setElementArgu: function () {
        var self = this,
            $t, sid, source;

        $('[operation-sid]').map(function () {
            $t = $(this);
            sid = $t.attr('operation-sid');
            source = self.sidObj[sid];

            if (!sid || !source) {
                return;
            }

            $t.data('argu', 'source=' + encodeURIComponent(source));

            $t.removeAttr('operation-sid');
        });
    },

    initEvent: function () {
        $(document).on('pa-operation-source', $.proxy(this.exec, this));
    }
};

$(function () {
    app.init();
});