var t = require("../../api.js"),
  a = getApp(),
  e = "",
  i = "",
  s = require("../../utils/utils.js"),
  o = !1;
Page({
  data: {
    total_price: 0,
    address: null,
    express_price: 0,
    content: "",
    offline: 0,
    express_price_1: 0,
    name: "",
    mobile: "",
    integral_radio: 1,
    new_total_price: 0,
    show_card: !1,
    payment: -1,
    show_payment: !1,
    pond_id: !1,
    scratch_id: !1
  },
  onLoad: function(t) {
    a.pageOnLoad(this);
    var e = this,
      i = s.formatData(new Date);
    wx.removeStorageSync("input_data"), t.pond_id && e.setData({
      pond_id: t.pond_id
    }), t.scratch_id && e.setData({
      scratch_id: t.scratch_id
    }), e.setData({
      options: t,
      store: wx.getStorageSync("store"),
      time: i
    })
  },
  bindkeyinput: function(t) {
    var a = t.currentTarget.dataset.mchIndex; - 1 == a ? this.setData({
      content: t.detail.value
    }) : (this.data.mch_list[a] && (this.data.mch_list[a].content = t.detail.value), this.setData({
      mch_list: this.data.mch_list
    }))
  },
  KeyName: function(t) {
    this.setData({
      name: t.detail.value
    })
  },
  KeyMobile: function(t) {
    this.setData({
      mobile: t.detail.value
    })
  },
  getOffline: function(t) {
    var a = this,
      e = this.data.express_price,
      i = this.data.express_price_1;
    1 == t.currentTarget.dataset.index ? this.setData({
      offline: 1,
      express_price: 0,
      express_price_1: e,
      is_area: 0
    }) : this.setData({
      offline: 0,
      express_price: i
    }), a.getPrice()
  },
  dingwei: function() {
    var t = this;
    wx.chooseLocation({
      success: function(a) {
        e = a.longitude, i = a.latitude, t.setData({
          location: a.address
        })
      },
      fail: function(e) {
        a.getauth({
          content: "需要获取您的地理位置授权，请到小程序设置中打开授权",
          success: function(a) {
            a && (a.authSetting["scope.userLocation"] ? t.dingwei() : wx.showToast({
              title: "您取消了授权",
              image: "/images/icon-warning.png"
            }))
          }
        })
      }
    })
  },
  orderSubmit: function (t) {
    var a = this,
      e = a.data.offline,
      i = {};
    if (0 == e) {
      if (1 == a.data.is_area) return void wx.showToast({
        title: "所选地区无货",
        image: "/images/icon-warning.png"
      });
      if (!a.data.address || !a.data.address.id) return void wx.showToast({
        title: "请选择收货地址",
        image: "/images/icon-warning.png"
      });
      i.address_id = a.data.address.id
    } else {
      if (i.address_name = a.data.name, i.address_mobile = a.data.mobile, !a.data.shop.id) return void wx.showModal({
        title: "警告",
        content: "请选择门店",
        showCancel: !1
      });
      if (i.shop_id = a.data.shop.id, !i.address_name || void 0 == i.address_name) return void a.showToast({
        title: "请填写收货人",
        image: "/images/icon-warning.png"
      });
      if (!i.address_mobile || void 0 == i.address_mobile) return void a.showToast({
        title: "请填写联系方式",
        image: "/images/icon-warning.png"
      });
      if (!/^\+?\d[\d -]{8,12}\d/.test(i.address_mobile)) return void wx.showModal({
        title: "提示",
        content: "手机号格式不正确",
        showCancel: !1
      })
    }
    i.offline = e;
    var s = a.data.form;
    if (1 == s.is_form && a.data.goods_list && a.data.goods_list.length) {
      var o = s.list;
      for (var d in o)
        if ("date" == o[d].type && (o[d].default = o[d].default ? o[d].default : a.data.time), "time" == o[d].type && (o[d].default = o[d].default ? o[d].default : "00:00"), 1 == o[d].required)
          if ("radio" == o[d].type || "checkboxc" == o[d].type) {
            var n = !1;
            for (var r in o[d].default_list) 1 == o[d].default_list[r].is_selected && (n = !0);
            if (!n) return wx.showModal({
              title: "提示",
              content: "请填写" + s.name + "，加‘*’为必填项",
              showCancel: !1
            }), !1
          } else if (!o[d].default || void 0 == o[d].default) return wx.showModal({
        title: "提示",
        content: "请填写" + s.name + "，加‘*’为必填项",
        showCancel: !1
      }), !1
    }
    if (a.data.pond_id > 0) {
      if (a.data.express_price > 0 && -1 == a.data.payment) return a.setData({
        show_payment: !0
      }), !1
    } else if (a.data.scratch_id > 0) {
      if (a.data.express_price > 0 && -1 == a.data.payment) return a.setData({
        show_payment: !0
      }), !1
    } else if (-1 == a.data.payment) return a.setData({
      show_payment: !0
    }), !1;
    if (i.form = JSON.stringify(s), a.data.cart_id_list && (i.cart_id_list = JSON.stringify(a.data.cart_id_list)), a.data.mch_list && a.data.mch_list.length) {
      var c = [];
      for (var d in a.data.mch_list)
        if (a.data.mch_list[d].cart_id_list) {
          var l = {
            id: a.data.mch_list[d].id,
            cart_id_list: a.data.mch_list[d].cart_id_list
          };
          a.data.mch_list[d].content && (l.content = a.data.mch_list[d].content), c.push(l)
        }
      c.length ? i.mch_list = JSON.stringify(c) : i.mch_list = ""
    }
    a.data.goods_info && (i.goods_info = JSON.stringify(a.data.goods_info)), a.data.picker_coupon && (i.user_coupon_id = a.data.picker_coupon.user_coupon_id), a.data.content && (i.content = a.data.content), a.data.cart_list && (i.cart_list = JSON.stringify(a.data.cart_list)), 1 == a.data.integral_radio ? i.use_integral = 1 : i.use_integral = 2, a.data.goods_list && a.data.goods_list.length || !a.data.mch_list || 1 != a.data.mch_list.length || (i.content = a.data.mch_list[0].content ? a.data.mch_list[0].content : ""), i.payment = a.data.payment, i.formId = t.detail.formId, i.pond_id = a.data.pond_id, i.scratch_id = a.data.scratch_id, i.pond_id ? a.order_submit(i, "pond") : i.scratch_id ? a.order_submit(i, "scratch") : a.order_submit(i, "s")
  },
  onReady: function() {},
  onShow: function(t) {
    if (!getApp().onShowData || !getApp().onShowData.scene || 1034 != getApp().onShowData.scene)
      if (o) o = !1;
      else {
        getCurrentPages();
        a.pageOnShow(this);
        var e = this,
          i = wx.getStorageSync("picker_address");
        if (i) {
          e.data.is_area_city_id;
          var s = {};
          s.address = i, s.name = i.name, s.mobile = i.mobile, wx.removeStorageSync("picker_address"), e.setData(s), e.getInputData()
        }
        e.getOrderData(e.data.options)
      }
  },
  getOrderData: function(s) {
    var o = this,
      d = {},
      n = "";
    if (o.data.address && o.data.address.id && (n = o.data.address.id), d.address_id = n, d.longitude = e, d.latitude = i, wx.showLoading({
        title: "正在加载",
        mask: !0
      }), s.cart_list) {
      JSON.parse(s.cart_list);
      d.cart_list = s.cart_list
    }
    if (s.cart_id_list) {
      var r = JSON.parse(s.cart_id_list);
      d.cart_id_list = r
    }
    if (s.mch_list) {
      var c = JSON.parse(s.mch_list);
      d.mch_list = c
    }
    s.goods_info && (d.goods_info = s.goods_info), a.request({
      url: t.order.submit_preview,
      data: d,
      success: function(t) {
        if (wx.hideLoading(), 0 == t.code) {
          var a = wx.getStorageSync("input_data");
          wx.removeStorageSync("input_data");
          var e = [],
            i = t.data.coupon_list;
          for (var s in i) null != i[s] && e.push(i[s]);
          var d = t.data.shop_list,
            n = {};
          d && 1 == d.length && (n = d[0]), t.data.is_shop && (n = t.data.is_shop), a || ((a = {
            shop: n,
            address: t.data.address || null,
            name: t.data.address ? t.data.address.name : "",
            mobile: t.data.address ? t.data.address.mobile : "",
            pay_type_list: t.data.pay_type_list,
            form: t.data.form
          }).pay_type_list.length > 1 ? a.payment = -1 : a.payment = a.pay_type_list[0].payment), a.total_price = t.data.total_price || 0, a.goods_list = t.data.list || null, a.express_price = parseFloat(t.data.express_price), a.coupon_list = i, a.shop_list = d, a.send_type = t.data.send_type, a.level = t.data.level, a.new_total_price = t.data.total_price || 0, a.integral = t.data.integral, a.goods_card_list = t.data.goods_card_list || [], a.is_payment = t.data.is_payment, a.mch_list = t.data.mch_list || null, a.is_area_city_id = t.data.is_area_city_id, a.pay_type_list = t.data.pay_type_list, a.offer_rule = t.data.offer_rule, a.is_area = t.data.is_area, o.setData(a), o.getInputData(), t.data.goods_info && o.setData({
            goods_info: t.data.goods_info
          }), t.data.cart_id_list && o.setData({
            cart_id_list: t.data.cart_id_list
          }), t.data.cart_list && o.setData({
            cart_list: t.data.cart_list
          }), 1 == t.data.send_type && o.setData({
            offline: 0
          }), 2 == t.data.send_type && o.setData({
            offline: 1
          }), o.getPrice()
        }
        1 == t.code && wx.showModal({
          title: "提示",
          content: t.msg,
          showCancel: !1,
          confirmText: "返回",
          success: function(t) {
            t.confirm && wx.navigateBack({
              delta: 1
            })
          }
        })
      }
    })
  },
  copyText: function(t) {
    var a = t.currentTarget.dataset.text;
    a && wx.setClipboardData({
      data: a,
      success: function() {
        page.showToast({
          title: "已复制内容"
        })
      },
      fail: function() {
        page.showToast({
          title: "复制失败",
          image: "/images/icon-warning.png"
        })
      }
    })
  },
  showCouponPicker: function() {
    var t = this;
    t.getInputData(), t.data.coupon_list && t.data.coupon_list.length > 0 && t.setData({
      show_coupon_picker: !0
    })
  },
  pickCoupon: function(t) {
    var a = this,
      e = t.currentTarget.dataset.index,
      i = wx.getStorageSync("input_data");
    wx.removeStorageSync("input_data"), "-1" == e || -1 == e ? (i.picker_coupon = !1, i.show_coupon_picker = !1) : (i.picker_coupon = a.data.coupon_list[e], i.show_coupon_picker = !1), a.setData(i), a.getPrice()
  },
  numSub: function(t, a, e) {
    return 100
  },
  showShop: function(t) {
    var a = this;
    a.getInputData(), a.dingwei(), a.data.shop_list && a.data.shop_list.length >= 1 && a.setData({
      show_shop: !0
    })
  },
  pickShop: function(t) {
    var a = this,
      e = t.currentTarget.dataset.index,
      i = wx.getStorageSync("input_data");
    wx.removeStorageSync("input_data"), "-1" == e || -1 == e ? (i.shop = !1, i.show_shop = !1) : (i.shop = a.data.shop_list[e], i.show_shop = !1), a.setData(i), a.getPrice()
  },
  integralSwitchChange: function(t) {
    var a = this;
    0 != t.detail.value ? a.setData({
      integral_radio: 1
    }) : a.setData({
      integral_radio: 2
    }), a.getPrice()
  },
  integration: function(t) {
    var a = this.data.integral.integration;
    wx.showModal({
      title: "积分使用规则",
      content: a,
      showCancel: !1,
      confirmText: "我知道了",
      confirmColor: "#ff4544",
      success: function(t) {
        t.confirm
      }
    })
  },
  getPrice: function() {
    var t = this,
      a = t.data.total_price,
      e = t.data.express_price,
      i = t.data.picker_coupon,
      s = t.data.integral,
      o = t.data.integral_radio,
      d = t.data.level,
      n = t.data.offline;
    if (t.data.goods_list && t.data.goods_list.length > 0 && (i && (a -= i.sub_price), s && 1 == o && (a -= parseFloat(s.forehead)), d && (a = a * d.discount / 10), a <= .01 && (a = .01), 0 == n && (a += e)), t.data.mch_list && t.data.mch_list.length)
      for (var r in t.data.mch_list) a += t.data.mch_list[r].total_price + t.data.mch_list[r].express_price;
    t.setData({
      new_total_price: parseFloat(a.toFixed(2))
    })
  },
  cardDel: function() {
    this.setData({
      show_card: !1
    }), wx.redirectTo({
      url: "/pages/order/order?status=1"
    })
  },
  cardTo: function() {
    this.setData({
      show_card: !1
    }), wx.redirectTo({
      url: "/pages/card/card"
    })
  },
  formInput: function(t) {
    var a = this,
      e = t.currentTarget.dataset.index,
      i = a.data.form,
      s = i.list;
    s[e].default = t.detail.value, i.list = s, a.setData({
      form: i
    })
  },
  selectForm: function(t) {
    var a = this,
      e = t.currentTarget.dataset.index,
      i = t.currentTarget.dataset.k,
      s = a.data.form,
      o = s.list;
    if ("radio" == o[e].type) {
      var d = o[e].default_list;
      for (var n in d) n == i ? d[i].is_selected = 1 : d[n].is_selected = 0;
      o[e].default_list = d
    }
    "checkbox" == o[e].type && (1 == (d = o[e].default_list)[i].is_selected ? d[i].is_selected = 0 : d[i].is_selected = 1, o[e].default_list = d), s.list = o, a.setData({
      form: s
    })
  },
  showPayment: function() {
    this.setData({
      show_payment: !0
    })
  },
  payPicker: function(t) {
    var a = t.currentTarget.dataset.index;
    this.setData({
      payment: a,
      show_payment: !1
    })
  },
  payClose: function() {
    this.setData({
      show_payment: !1
    })
  },
  getInputData: function() {
    var t = this,
      a = {
        address: t.data.address,
        content: t.data.content,
        name: t.data.name,
        mobile: t.data.mobile,
        integral_radio: t.data.integral_radio,
        payment: t.data.payment,
        shop: t.data.shop,
        form: t.data.form,
        picker_coupon: t.data.picker_coupon
      };
    wx.setStorageSync("input_data", a)
  },
  onHide: function() {
    a.pageOnHide(this), this.getInputData()
  },
  onUnload: function() {
    a.pageOnUnload(this), wx.removeStorageSync("input_data")
  },
  uploadImg: function(t) {
    var e = this,
      i = t.currentTarget.dataset.index,
      s = e.data.form;
    o = !0, a.uploader.upload({
      start: function() {
        wx.showLoading({
          title: "正在上传",
          mask: !0
        })
      },
      success: function(t) {
        0 == t.code ? (s.list[i].default = t.data.url, e.setData({
          form: s
        })) : e.showToast({
          title: t.msg
        })
      },
      error: function(t) {
        e.showToast({
          title: t
        })
      },
      complete: function() {
        wx.hideLoading()
      }
    })
  }
});