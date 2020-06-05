var t = null,
  e = null,
  a = null,
  i = null,
  n = null,
  r = null,
  o = null,
  s = null;
"undefined" != typeof wx && (t = require("./hj.js"), e = require("./utils/page.js"), a = require("./utils/request.js"), i = require("./api.js"), n = require("./utils/utils.js"), r = require("./commons/order-pay/order-pay.js"), o = require("./utils/uploader"), s = require("./utils/login.js"));
var u = App({
  is_on_launch: !0,
  onShowData: null,
  _version: "2.6.7",
  onLaunch: function() {
    this.setApi(), i = this.api, this.getNavigationBarColor(), this.getStoreData(), this.getCatList()
  },
  onShow: function(t) {
    this.onShowData = t
  },
  getStoreData: function() {
    var t = this;
    this.request({
      url: i.default.store,
      success: function(e) {
        0 == e.code && (t.hj.setStorageSync("store", e.data.store), t.hj.setStorageSync("store_name", e.data.store_name), t.hj.setStorageSync("show_customer_service", e.data.show_customer_service), t.hj.setStorageSync("contact_tel", e.data.contact_tel), t.hj.setStorageSync("share_setting", e.data.share_setting), t.permission_list = e.data.permission_list, t.hj.setStorageSync("wxapp_img", e.data.wxapp_img), t.hj.setStorageSync("wx_bar_title", e.data.wx_bar_title))
      },
      complete: function() {}
    })
  },
  getCatList: function() {
    var t = this;
    this.request({
      url: i.default.cat_list,
      success: function(e) {
        if (0 == e.code) {
          var a = e.data.list || [];
          t.hj.setStorageSync("cat_list", a)
        }
      }
    })
  },
  saveFormId: function(t) {
    this.request({
      url: i.user.save_form_id,
      data: {
        form_id: t
      }
    })
  },
  loginBindParent: function(t) {
    var e = this;
    if ("" == e.hj.getStorageSync("access_token")) return !0;
    e.bindParent(t)
  },
  bindParent: function(t) {
    var e = this;
    if ("undefined" != t.parent_id && 0 != t.parent_id) {
      var a = e.hj.getStorageSync("user_info");
      e.hj.getStorageSync("share_setting").level > 0 && 0 != t.parent_id && e.request({
        url: i.share.bind_parent,
        data: {
          parent_id: t.parent_id
        },
        success: function(t) {
          0 == t.code && (a.parent = t.data, e.hj.setStorageSync("user_info", a))
        }
      })
    }
  },
  shareSendCoupon: function(t) {
    var e = this;
    e.hj.showLoading({
      mask: !0
    }), t.hideGetCoupon || (t.hideGetCoupon = function(a) {
      var i = a.currentTarget.dataset.url || !1;
      t.setData({
        get_coupon_list: null
      }), i && e.hj.navigateTo({
        url: i
      })
    }), this.request({
      url: i.coupon.share_send,
      success: function(e) {
        0 == e.code && t.setData({
          get_coupon_list: e.data.list
        })
      },
      complete: function() {
        e.hj.hideLoading()
      }
    })
  },
  getauth: function(t) {
    var e = this;
    e.hj.showModal({
      title: "是否打开设置页面重新授权",
      content: t.content,
      confirmText: "去设置",
      success: function(a) {
        a.confirm ? e.hj.openSetting({
          success: function(e) {
            t.success && t.success(e)
          },
          fail: function(e) {
            t.fail && t.fail(e)
          },
          complete: function(e) {
            t.complete && t.complete(e)
          }
        }) : t.cancel && e.getauth(t)
      }
    })
  },
  setApi: function() {
    function t(a) {
      for (var i in a) "string" == typeof a[i] ? a[i] = a[i].replace("{$_api_root}", e) : a[i] = t(a[i]);
      return a
    }
    var e = this.siteInfo.siteroot;
    e = e.replace("app/index.php", ""), e += "addons/zjhj_mall/core/web/index.php?store_id=-1&r=api/", this.api = t(this.api);
    var a = this.api.default.index,
      i = a.substr(0, a.indexOf("/index.php"));
    this.webRoot = i
  },
  webRoot: null,
  siteInfo: require("./siteinfo.js"),
  currentPage: null,
  pageOnLoad: function(t) {
    this.page.onLoad(t)
  },
  pageOnReady: function(t) {
    this.page.onReady(t)
  },
  pageOnShow: function(t) {
    this.page.onShow(t)
  },
  pageOnHide: function(t) {
    this.page.onHide(t)
  },
  pageOnUnload: function(t) {
    this.page.onUnload(t)
  },
  getNavigationBarColor: function() {
    var t = this;
    t.request({
      url: i.default.navigation_bar_color,
      success: function(e) {
        0 == e.code && (t.hj.setStorageSync("_navigation_bar_color", e.data), t.setNavigationBarColor())
      }
    })
  },
  setNavigationBarColor: function() {
    var t = this.hj.getStorageSync("_navigation_bar_color");
    t && this.hj.setNavigationBarColor(t)
  },
  loginNoRefreshPage: ["pages/index/index", "mch/shop/shop"],
  openWxapp: function(t) {
    if (t.currentTarget.dataset.url) {
      var e = t.currentTarget.dataset.url;
      (e = function(t) {
        var e = /([^&=]+)=([\w\W]*?)(&|$|#)/g,
          a = /^[^\?]+\?([\w\W]+)$/.exec(t),
          i = {};
        if (a && a[1])
          for (var n, r = a[1]; null != (n = e.exec(r));) i[n[1]] = n[2];
        return i
      }(e)).path = e.path ? decodeURIComponent(e.path) : "", this.hj.navigateToMiniProgram({
        appId: e.appId,
        path: e.path,
        complete: function(t) {}
      })
    }
  },
  navigatorClick: function(t, e) {
    var a = t.currentTarget.dataset.open_type;
    if ("redirect" == a) return !0;
    if ("wxapp" == a) {
      var i = t.currentTarget.dataset.path;
      "/" != i.substr(0, 1) && (i = "/" + i), this.hj.navigateToMiniProgram({
        appId: t.currentTarget.dataset.appid,
        path: i,
        complete: function(t) {}
      })
    }
    if ("tel" == a) {
      var n = t.currentTarget.dataset.tel;
      this.hj.makePhoneCall({
        phoneNumber: n
      })
    }
    return !1
  },
  hj: t,
  page: e,
  request: a,
  api: i,
  utils: n,
  order_pay: r,
  uploader: o,
  login: s,
  setRequire: function() {
    this.hj = require("./hj.js"), this.request = require("./utils/request.js"), this.page = require("./utils/page.js"), this.api = require("./api.js"), this.utils = require("./utils/utils.js"), this.order_pay = require("./commons/order-pay/order-pay.js"), this.uploader = require("./utils/uploader"), this.login = require("./utils/login.js")
  }
});
"undefined" != typeof my && u.setRequire();