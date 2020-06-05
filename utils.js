var o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
    return typeof o
  } : function(o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o
  },
  n = {
    scene_decode: function(o) {
      var n = (o + "").split(","),
        r = {};
      for (var t in n) {
        var e = n[t].split(":");
        e.length > 0 && e[0] && (r[e[0]] = e[1] || null)
      }
      return r
    },
    objectToUrlParams: function(n, r, t) {
      if (null == n) return "";
      var e = "",
        l = void 0 === n ? "undefined" : o(n);
      if ("string" == l || "number" == l || "boolean" == l) e += "&" + r + "=" + (null == t || t ? encodeURIComponent(n) : n);
      else
        for (var u in n) {
          var i = null == r ? u : r + (n instanceof Array ? "[" + u + "]" : "." + u);
          e += this.objectToUrlParams(n[u], i, t)
        }
      return e
    }
  };
module.exports = n;