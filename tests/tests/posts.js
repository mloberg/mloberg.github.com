module.exports = {
  'Posts should have comments on them': function(client) {
    client
      .url('http://localhost:4000/blog/2016/01/27/getting-started-with-jekyll.html')
      .waitForElementVisible('body', 1000)
      .assert.title('Getting Started With Jekyll | Matthew Loberg')
      .assert.containsText('.post-title', 'Getting Started With Jekyll')
      .assert.containsText('.post-meta', 'Published 27 Jan 2016')
      .assert.elementPresent('.post-meta .post-category-jekyll')
      .assert.elementPresent('#disqus_thread')
      .assert.elementCount('.related-posts li', 3)
      .end();
  },
  'A post can have comments turned off': function(client) {
    client
      .url('http://localhost:4000/blog/2011/10/06/i-write-code.html')
      .assert.title('I Write Code | Matthew Loberg')
      .assert.containsText('.post-title', 'I Write Code')
      .assert.containsText('.post-meta', 'Published 06 Oct 2011')
      .assert.elementNotPresent('.post-meta .post-category-jekyll')
      .assert.elementNotPresent('#disqus_thread')
      .assert.elementCount('.related-posts li', 3)
      .end()
  },
  'Old posts should show message about outdated information': function(client) {
    client
      .url('http://localhost:4000/blog/2012/11/21/installing-pcntl-on-lion.html')
      .assert.containsText('.post-meta', 'Published 21 Nov 2012')
      .assert.elementPresent('.alert-warning')
      .assert.containsText('.alert-warning', 'This article was published on Wednesday, November 21, 2012; more than 18 months ago')
      .end()
  },
  'A post can have the outdated message turned off': function(client) {
    client
      .url('http://localhost:4000/blog/2012/11/20/why-i-do-side-projects.html')
      .assert.containsText('.post-meta', 'Published 20 Nov 2012')
      .assert.elementNotPresent('.alert-warning')
      .end()
  }
};
