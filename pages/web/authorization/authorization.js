var n=require("../../../api.js"),e=getApp();Page({data:{user:{},is_bind:"",app:{}},onLoad:function(n){e.pageOnLoad(this),this.checkBind();var t=wx.getStorageSync("user_info");this.setData({user:t})},checkBind:function(){var t=this;wx.showLoading({title:"加载中"}),e.request({url:n.user.check_bind,success:function(n){wx.hideLoading(),0===n.code&&t.setData({is_bind:n.data.is_bind,app:n.data.app})}})},getUserInfo:function(e){wx.showLoading({title:"加载中"});var t=this;wx.login({success:function(i){var o=i.code;getApp().request({url:n.passport.login,method:"POST",data:{code:o,user_info:e.detail.rawData,encrypted_data:e.detail.encryptedData,iv:e.detail.iv,signature:e.detail.signature},success:function(n){wx.hideLoading(),0===n.code?(wx.showToast({title:"登录成功,请稍等...",icon:"none"}),t.bind()):wx.showToast({title:"服务器出错，请再次点击绑定",icon:"none"})}})}})},bind:function(){e.request({url:n.user.authorization_bind,data:{},success:function(n){if(0===n.code){var e=encodeURIComponent(n.data.bind_url);wx.redirectTo({url:"/pages/web/web?url="+e})}}})},onReady:function(){},onShow:function(){},onHide:function(){},onUnload:function(){},onPullDownRefresh:function(){},onReachBottom:function(){},onShareAppMessage:function(){}}); 
 			