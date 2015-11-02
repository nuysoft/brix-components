/*
 * api文档：http://docs.kissyui.com/1.4/docs/html/api/cookie/index.html
 */
/* global define */
/* jshint browser: true */
define(
  [
    'underscore'
  ],
  function(_) {
    var MILLISECONDS_OF_DAY = 24 * 60 * 60 * 1000;

    function Cookie() {}

    _.extend(Cookie.prototype, {
      isNotEmptyString: function(val) {
        return typeof val === "string" && val !== "";
      },
      decode: function(a) {
        return decodeURIComponent(a.replace(/\+/g, " "));
      },
      get: function(name) {
        var ret, m;
        if (this.isNotEmptyString(name)) {
          m = String(document.cookie).match(new RegExp("(?:^| )" + name + "(?:(?:=([^;]*))|;|$)"));
          if (m) {
            ret = m[1] ? this.decode(m[1]) : "";
          }
        }
        return ret;
      },
      set: function(name, val, expires, domain, path, secure) {
        var text = String(encodeURIComponent(val)),
          date = expires;
        if (typeof date === "number") {
          date = new Date();
          date.setTime(date.getTime() + expires * MILLISECONDS_OF_DAY);
        }
        if (date instanceof Date) {
          text += "; expires=" + date.toUTCString();
        }
        if (this.isNotEmptyString(domain)) {
          text += "; domain=" + domain;
        }
        if (this.isNotEmptyString(path)) {
          text += "; path=" + path;
        }
        if (secure) {
          text += "; secure";
        }
        document.cookie = name + "=" + text;
      },
      remove: function(name, domain, path, secure) {
        this.set(name, "", -1, domain, path, secure);
      }
    });

    return Cookie;
  }
);