'use strict';

var packForm = require('utils/packForm');

var app = {

    appId: '10022',

    adId: 'QY15090610250103',

    init: function () {
        var self = this;

        self.cacheElements();
        self.ssologin();
        self.getTopAd();
        self.bindEvents();
    },

    cacheElements: function () {
        var self = this;

        self.$window = $(window);
        self.$document = $(document);
        self.$body = $('body');
        self.$topAd = $('#J_Common_TopGg');
        self.$topAdClose = $('#J_Common_TopGg_Close');

        self.$searchForm = $('#J_Common_SearchForm');

        self.$loginArea = $('#J_Common_LoginArea');
        self.$userInfo = $('#J_Common_UserInfo');
        self.$orderNum = $('#J_Common_OrderNum');

        self.$backTop = $('#J_Common_Backtop');
        self.$backTopBase = $('.J_BacktopBase');

        self.$loginDialogBg = $('#J_Common_LoginDialog_Bg');
        self.$loginDialog = $('#J_Common_LoginDialog');
        self.$loginIframe = $('#J_Common_Loginiframe');
    },

    ssologin: function () {
        var self = this;

        $.ajax({
            url: globalUrlConfig.memberAlias,
            dataType: 'jsonp',
            success: function (res) {
                if (res.isLoginEmall) {
                    // 设置全局对象
                    window.userInfo = res;
                    self.$userInfo.html(
                        '<p>' + res.memberNickName + '</p><p>' +
                        (res.memberSex === 'F' ? '女士' : '先生') +
                        '，</p><p>欢迎您！</p>'
                    );
                    self.switchLoginState(true);
                    self.getOrderNum();
                } else {
                    window.userInfo = null;
                    self.$userInfo.html('');
                    self.switchLoginState(false);
                }
                self.$document.trigger('pa-login');
            }
        });
    },

    switchLoginState: function (isLogin) {
        var self = this,
            $uls = self.$loginArea.children('ul');

        $uls.hide();
        $uls.filter('[data-type="' + (isLogin ? 'yes' : 'no') + '"]').show();
    },

    login: function () {
        var self = this,
            data = {
                appid: self.appId,
                _: +new Date(),
                ptag: location.href
            };

        self.$loginIframe.attr('src', globalUrlConfig.loginToaMember + '?' + $.param(data));
        self.showLoginDialog();
    },

    showLoginDialog: function () {
        this.$window.scrollTop(0);
        this.$loginDialogBg.show();
        this.$loginDialog.show();
    },

    hideLoginDialog: function () {
        this.$loginDialogBg.hide();
        this.$loginDialog.hide();
    },

    getOrderNum: function () {
        var self = this;

        $.ajax({
            url: globalUrlConfig.ajaxUpdateOrderNumController,
            data: {
                randDate: +new Date()
            },
            dataType: 'jsonp',
            success: function (res) {
                if (res && res.data && res.data.allCount !== 0) {
                    self.$orderNum.text(res.data.allCount).show();
                } else {
                    self.$orderNum.text('').show();
                }
            }
        });
    },

    register: function () {
        var self = this,
            ptag = encodeURIComponent(location.href),
            data = {
                appid: self.appId,
                quickRedirect: true,
                ptag: ptag,
                _: +new Date()
            },
            url = globalUrlConfig.activeMemberFromMobileUser + '?' + $.param(data);

        window.open(url, 'toaWin',
            'scrollbars=yes,status=yes,resizable=yes,top=0,left=0,width=' +
            (screen.availWidth - 10) + ',height=' + (screen.availHeight - 45));
    },

    logout: function () {
        var self = this;

        self.$body.append(
            '<iframe src="' + globalUrlConfig.logout + '" style="display: none;"></iframe>'
        );
    },

    getTopAd: function () {
        var self = this;

        $.ajax({
            url: globalUrlConfig.ad,
            dataType: 'jsonp',
            data: {
                AREAID: self.adId
            },
            success: function (res) {
                if (!res.data[0].atts || !res.data[0].atts.placeList
                    || !res.data[0].atts.placeList.length
                    || !res.data[0].atts.placeList[0].adUrl
                    || !res.data[0].atts.placeList[0].adLink) {
                    return;
                }
                var data = res.data[0].atts.placeList[0];
                self.$topAd.children('a')
                    .css('backgroundImage', 'url(' + data.adUrl + ')')
                    .attr('href', data.adLink);
                self.$topAd.show();
            }
        });
    },

    search: function () {
        var self = this,
            data = packForm(self.$searchForm),
            url = globalUrlConfig.search;

        if (data.keyWord === '请输入关键字') {
            data.keyWord = '';
        }

        url += '?keyWord=' + data.keyWord + '&typeWord=' + data.typeWord;
        location.href = url;
        return false;
    },

    positionBacktop: function () {
        var self = this,
            windowWidth = self.$window.width(),
            windowHeight = self.$window.height(),
            scrollTop = self.$window.scrollTop(),
            bodyHeight = self.$body.height(),
            baseLine = self.$backTopBase.length
                ? self.$backTopBase.offset().top + self.$backTopBase.outerHeight()
                : bodyHeight - 300,
            backtoHeight = 140, // 现在的css没有办法计算self.$backTop.height()
            bottomOffset = bodyHeight - baseLine, // 离底部bottomOffset的时候，就不在下移了
            position, left, right, top, bottom;

        // 控制上下位置
        if (windowWidth > 1200 + 150) {
            left = windowWidth * 0.5 + 620;
            right = '';
        } else {
            left = '';
            right = 5;
        }

        // 控制高度
        if (baseLine + 20 <= scrollTop + windowHeight) {
            position = 'absolute';
            top = bodyHeight - bottomOffset - backtoHeight;
            bottom = '';
        } else {
            position = 'fixed';
            top = '';
            bottom = 20;
        }

        self.$backTop.css({
            position: position,
            left: left,
            right: right,
            bottom: bottom,
            top: top
        });

        // 控制backtop的显示隐藏
        if (scrollTop > 200) {
            self.$backTop.children('a:last').show();
        } else {
            self.$backTop.children('a:last').hide();
        }
    },

    bindEvents: function () {
        var self = this;

        // 关闭广告
        self.$topAdClose.on('click', function () {
            self.$topAd.hide();
            return false;
        });

        // 登陆弹窗
        self.$loginArea.on('click', '[data-type="login"]', $.proxy(self.login, self));
        self.$document.on('pa-loginDialog', $.proxy(self.login, self));

        // 注册
        self.$loginArea.on('click', '[data-type="register"]', $.proxy(self.register, self));
        self.$loginDialog.on('click', '[data-type="register"]', $.proxy(self.register, self));
        self.$document.on('pa-register', $.proxy(self.register, self));

        // 退出
        self.$loginArea.on('click', '[data-type="logout"]', $.proxy(self.logout, self));

        // 关闭弹窗
        self.$loginDialog.on('click', '.close', $.proxy(self.hideLoginDialog, self));

        // 搜索
        self.$searchForm.on('click', 'a', $.proxy(self.search, self));
        self.$searchForm.on('submit', $.proxy(self.search, self));
        self.$searchForm.children('[name="keyWord"]').on({
            'focus': function () {
                var $this = $(this),
                    val = $this.val();

                $this.val(val === '请输入关键字' ? '' : val);
            },
            'blur': function () {
                var $this = $(this),
                    val = $this.val();

                $this.val(val === '' ? '请输入关键字' : val);
            }
        });

        self.$backTop.on('click', '.rt_top', function () {
            $('body, html').animate({
                scrollTop: 0
            });
        });

        self.$window.on('scroll', $.proxy(self.positionBacktop, self));
    }
};

$(function () {
    app.init();
});