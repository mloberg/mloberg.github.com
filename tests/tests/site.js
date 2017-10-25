module.exports = {
  'Homepage': function(client) {
    client
      .url('http://localhost:4000')
      .waitForElementVisible('body', 1000)
      .assert.title('Home | Matthew Loberg')
      .assert.elementCount('.nav-list > .nav-item', 3)
      .assert.elementCount('.post', 5)
      .useXpath()
      .click('//a[contains(@class, "pure-button") and text()="Next"]')
      .useCss()
      .pause(1000)
      .assert.urlContains('/page2')
      .end();
  },
  'About': function(client) {
    client
      .url('http://localhost:4000')
      .waitForElementVisible('body', 1000)
      .useXpath()
      .click('//a[contains(@class, "pure-menu-link") and text()="About"]')
      .useCss()
      .pause(1000)
      .assert.title('About | Matthew Loberg')
      .assert.visible('.profile')
      .end();
  }
};
