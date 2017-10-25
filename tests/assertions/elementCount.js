// A custom Nightwatch assertion.
// the name of the method is the filename.
// can be used in tests like this:
//
//   browser.assert.elementCount(selector, count)
//
// Credit: https://github.com/vuejs-templates/webpack/blob/3fc5eb210f6376fe7ca2eb27a6eb606216c214fe/template/test/e2e/custom-assertions/elementCount.js
exports.assertion = function (selector, count) {
  this.message = 'Testing if element <' + selector + '> has count: ' + count;
  this.expected = count;
  this.pass = function (val) {
    return val === this.expected;
  }
  this.value = function (res) {
    return res.value;
  }
  this.command = function (cb) {
    var self = this;
    return this.api.execute(function (selector) {
      return document.querySelectorAll(selector).length;
    }, [selector], function (res) {
      cb.call(self, res);
    });
  }
};
