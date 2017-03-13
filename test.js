var x = require('casper').selectXPath;
var BASEURL = 'http://localhost:3000';

casper.test.begin('Homepage', 5, function suite(test) {
  casper.start(BASEURL, function() {
    test.assertTitle("Home - Matthew Loberg");
    test.assertElementCount('.nav-list > .nav-item', 3, 'There should be social media links.');
    test.assertElementCount('.post', 5, 'There should be 5 posts on the first page.');
    this.click(x('//a[contains(@class, "pure-button") and text()="Next"]'));
  }).then(function() {
    test.assertUrlMatch(/page2/, "We are on the second page of posts.");
    test.assertElementCount('.post', 5, 'There should be 5 posts on the second page.');
  }).run(function() {
    test.done();
  });
});

casper.test.begin('About', 2, function suite(test) {
  casper.start(BASEURL, function() {
    this.click(x('//a[contains(@class, "pure-menu-link") and text()="About"]'));
  }).then(function() {
    test.assertTitle('About - Matthew Loberg');
    test.assertResourceExists(function(resource) {
      return resource.url.match(/profile3(?:-\w+)?.jpg/);
    }, 'Profile picture is loaded.');
  }).run(function() {
    test.done();
  });
});

casper.test.begin('Posts should have comments on them', 6, function suite(test) {
  casper.start(BASEURL + '/blog/2016/01/27/getting-started-with-jekyll.html', function() {
    test.assertTitle('Getting Started With Jekyll - Matthew Loberg');
    test.assertSelectorHasText('.post-title', 'Getting Started With Jekyll');
    test.assertSelectorHasText('.post-meta', 'Published 27 Jan 2016');
    test.assertExists('.post-meta .post-category-jekyll', 'Categories are displayed');
    test.assertExists('#disqus_thread', 'Comments should be loaded.');
    test.assertElementCount('.related-posts li', 3);
  }).run(function() {
    test.done();
  });
});

casper.test.begin('A post can have comments turned off', 6, function suite(test) {
  casper.start(BASEURL + '/blog/2011/10/06/i-write-code.html', function() {
    test.assertTitle('I Write Code - Matthew Loberg');
    test.assertSelectorHasText('.post-title', 'I Write Code');
    test.assertSelectorHasText('.post-meta', 'Published 06 Oct 2011');
    test.assertNotExists('.post-category', 'A post does not need categories');
    test.assertNotExists('#disqus_thread', 'Comments should not be loaded.');
    test.assertElementCount('.related-posts li', 3);
  }).run(function() {
    test.done();
  });
});

casper.test.begin('Old posts should show message about outdated information', 3, function suite(test) {
  casper.start(BASEURL + '/blog/2012/11/21/installing-pcntl-on-lion.html', function() {
    test.assertSelectorHasText('.post-meta', 'Published 21 Nov 2012');
    test.assertExists('.alert-warning', 'Message exists.');
    test.assertMatch(
      this.fetchText('.alert-warning').replace(/\n\s+/g, ' '),
      /This article was published on Wednesday, November 21, 2012; more than 18 months ago/,
      'Message has correct text.'
    );
  }).run(function() {
    test.done();
  })
});

casper.test.begin('A post can have the outdated message turned off', 2, function suite(test) {
  casper.start(BASEURL + '/blog/2012/11/20/why-i-do-side-projects.html', function() {
    test.assertSelectorHasText('.post-meta', 'Published 20 Nov 2012');
    test.assertNotExists('.alert-warning', 'Message does not exists.');
  }).run(function() {
    test.done();
  });
});
