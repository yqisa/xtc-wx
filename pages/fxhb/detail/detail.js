var t=require("../../../api.js"),e=getApp(),a=null;Page({data:{page_img:{bg:e.webRoot+"/statics/images/fxhb/bg.png",close:e.webRoot+"/statics/images/fxhb/close.png",hongbao_bg:e.webRoot+"/statics/images/fxhb/hongbao_bg.png",open_hongbao_btn:e.webRoot+"/statics/images/fxhb/open_hongbao_btn.png",wechat:e.webRoot+"/statics/images/fxhb/wechat.png",coupon:e.webRoot+"/statics/images/fxhb/coupon.png",pointer_r:e.webRoot+"/statics/images/fxhb/pointer_r.png",best_icon:e.webRoot+"/statics/images/fxhb/best_icon.png",more_l:e.webRoot+"/statics/images/fxhb/more_l.png",more_r:e.webRoot+"/statics/images/fxhb/more_r.png",cry:e.webRoot+"/statics/images/fxhb/cry.png",share_modal_bg:e.webRoot+"/statics/images/fxhb/share_modal_bg.png"},goods_list:null,rest_time_str:"--:--:--"},onLoad:function(a){var o=this;e.pageOnLoad(this);var s=a.id;wx.showLoading({title:"加载中",mask:!0}),e.request({url:t.fxhb.detail,data:{id:s},success:function(t){wx.hideLoading(),1!=t.code?(0==t.code&&(o.setData({rule:t.data.rule,share_pic:t.data.share_pic,share_title:t.data.share_title,coupon_total_money:t.data.coupon_total_money,rest_user_num:t.data.rest_user_num,rest_time:t.data.rest_time,hongbao:t.data.hongbao,hongbao_list:t.data.hongbao_list,is_my_hongbao:t.data.is_my_hongbao,my_coupon:t.data.my_coupon,goods_list:t.data.goods_list}),o.setRestTimeStr()),o.showShareModal()):wx.showModal({title:"提示",content:t.msg,showCancel:!1,success:function(e){e.confirm&&(1==t.game_open?wx.redirectTo({url:"/pages/fxhb/open/open"}):wx.redirectTo({url:"/pages/index/index"}))}})}})},onReady:function(){e.pageOnReady(this)},onShow:function(){e.pageOnShow(this)},showRule:function(){this.setData({showRule:!0})},closeRule:function(){this.setData({showRule:!1})},showShareModal:function(){this.setData({showShareModal:!0})},closeShareModal:function(){this.setData({showShareModal:!1})},setRestTimeStr:function(){var t=this,e=t.data.rest_time||!1;!1!==e&&null!==e&&((e=parseInt(e))<=0?t.setData({rest_time_str:"00:00:00"}):(a&&clearInterval(a),a=setInterval(function(){if((e=t.data.rest_time)<=0)return clearInterval(a),void t.setData({rest_time_str:"00:00:00"});var o=parseInt(e/3600),s=parseInt(e%3600/60),i=parseInt(e%3600%60);t.setData({rest_time:e-1,rest_time_str:(o<10?"0"+o:o)+":"+(s<10?"0"+s:s)+":"+(i<10?"0"+i:i)})},1e3)))},detailSubmit:function(a){var o=this;wx.showLoading({mask:!0}),e.request({url:t.fxhb.detail_submit,method:"post",data:{id:o.data.hongbao.id,form_id:a.detail.formId},success:function(t){if(1==t.code)return wx.hideLoading(),void o.showToast({title:t.msg,complete:function(){0==t.game_open&&wx.redirectTo({url:"/pages/index/index"})}});0==t.code&&(wx.hideLoading(),o.showToast({title:t.msg,complete:function(){1==t.reload&&wx.redirectTo({url:"/pages/fxhb/detail/detail?id="+o.options.id})}}))}})},onShareAppMessage:function(){var t=this,e=t.data.__user_info;return{path:"/pages/fxhb/detail/detail?id="+t.data.hongbao.id+(e?"&user_id="+e.id:""),title:t.data.share_title||null,imageUrl:t.data.share_pic||null,complete:function(e){t.closeShareModal()}}}}); 
 			