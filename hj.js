function t(t) {
  var e = "";
  for (var n in t) e += "&" + n + "=" + t[n];
  return e.substr(1)
}
var e = null;
if ("undefined" != typeof wx) e = wx;
else {
  (e = my).getSystemInfoSync = function() {
    return {}
  };
  var n = my.setStorageSync;
  e.setStorageSync = function(t, e) {
    return n({
      key: t,
      data: e
    })
  };
  var r = my.getStorageSync;
  e.getStorageSync = function(t) {
    var e = r({
      key: t
    });
    return e ? e.data : e
  }, e.request = function(e) {
    if ("get" == e.method.toLowerCase() && e.data) {
      var n = t(e.data);
      e.url += "&" + n, e.data = null
    }
    my.httpRequest(e)
  }, e.setNavigationBarColor = function() {}, e.setNavigationBarTitle = function() {}
}
module.exports = e;