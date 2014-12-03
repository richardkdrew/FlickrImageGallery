var specHelper = (function() {
  var service = {
    fakeLogger: fakeLogger
  };
  return service;

  function fakeLogger($provide) {
    $provide.value('logger', sinon.stub({
      error: function (message, data, title) {},
      info: function (message, data, title) {},
      success: function (message, data, title) {},
      warning: function (message, data, title) {}
    }));
  }
})();
