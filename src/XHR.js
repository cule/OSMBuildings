
var XHR = {};

(function() {

  var loading = {};

  XHR.loadJSON = function(url, callback) {
    if (loading[url]) {
      return loading[url];
    }

    var req = new XMLHttpRequest();

    req.onreadystatechange = function() {
      if (req.readyState !== 4) {
        return;
      }

      delete loading[url];

      if (!req.status || req.status < 200 || req.status > 299) {
        return;
      }

      if (req.responseText) {
        try {
          callback(JSON.parse(req.responseText));
        } catch(ex) {}
      }
    };

    loading[url] = req;
    req.open('GET', url);
    req.send(null);

    return {
      abort: function() {
        req.abort();
        delete loading[url];
      }
    };
  };

  XHR.abortAll = function() {
    for (var url in loading) {
      loading[url].abort();
    }
    loading = {};
  };

}());
