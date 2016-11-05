var BASEURL = 'http://localhost:4000';

casper.test.begin('Homepage', 7, function suite(test) {
  casper.start(BASEURL, function() {
    test.assertTitle("Matthew Loberg · Software Engineer");
    test.assertNotVisible('#sidebar', 'Sidebar is not visible');
    test.assertElementCount('.post', 5, 'There should be 5 posts on the first page.');
    this.click('.older');
  }).then(function() {
    test.assertUrlMatch(/page2/, "We are on the second page of posts.");
    test.assertElementCount('.post', 5, 'There should be 5 posts on the second page.');
    this.click('.sidebar-toggle');
  }).then(function() {
    test.assertVisible('#sidebar', 'Sidebar should be visible after clicking hamburger.');
    test.assertElementCount('#sidebar .social ul li', 2);
  }).run(function() {
    test.done();
  });
});

casper.test.begin('We can force the sidebar open with a query parameter', 3, function suite(test) {
  casper.start(BASEURL + '/?sidebar=1', function() {
    test.assertVisible('#sidebar');
    this.click('.sidebar-nav .sidebar-nav-item:nth-child(2)');
  }).then(function() {
    test.assertTitle('About · Matthew Loberg');
    test.assertResourceExists(function(resource) {
      return resource.url.match('profile3.jpg');
    }, 'Profile picture is loaded.');
  }).run(function() {
    test.done();
  });
});

casper.test.begin('Projects are being loaded from site data', 3, function suite(test) {
  casper.start(BASEURL + '/projects', function() {
    test.assertTitle('Projects · Matthew Loberg');
    test.assertEval(function() {
      return __utils__.findAll('.projects:nth-of-type(1) li').length >= 5;
    }, 'Projects I own should be listed.');
    test.assertEval(function() {
      return __utils__.findAll('.projects:nth-of-type(2) li').length >= 3;
    }, 'Projects I contribute to should be listed.');
  }).run(function() {
    test.done();
  });
});

casper.test.begin('Posts should have comments on them', 5, function suite(test) {
  casper.start(BASEURL + '/blog/2016/01/27/getting-started-with-jekyll.html', function() {
    test.assertTitle('Getting Started With Jekyll · Matthew Loberg');
    test.assertSelectorHasText('.post-title', 'Getting Started With Jekyll');
    test.assertSelectorHasText('.post-date', '27 Jan 2016');
    test.assertExists('#disqus_thread iframe', 'Comments should be loaded.');
    test.assertElementCount('.related-posts li', 3);
  }).run(function() {
    test.done();
  });
});

casper.test.begin('A post can have comments turned off', 5, function suite(test) {
  casper.start(BASEURL + '/blog/2011/10/06/i-write-code.html', function() {
    test.assertTitle('I Write Code · Matthew Loberg');
    test.assertSelectorHasText('.post-title', 'I Write Code');
    test.assertSelectorHasText('.post-date', '06 Oct 2011');
    test.assertNotExists('#disqus_thread', 'Comments should not be loaded.');
    test.assertElementCount('.related-posts li', 3);
  }).run(function() {
    test.done();
  });
});

casper.test.begin('Old posts should show message about outdated information', 3, function suite(test) {
  casper.start(BASEURL + '/blog/2012/11/21/installing-pcntl-on-lion.html', function() {
    test.assertSelectorHasText('.post-date', '21 Nov 2012');
    test.assertExists('.message', 'Message exists.');
    test.assertMatch(
      this.fetchText('.message').replace(/\n\s+/g, ' '),
      /this means the content may be out of date or no longer relevant/,
      'Message has correct text.'
    );
  }).run(function() {
    test.done();
  })
});

casper.test.begin('A post can have the outdated message turned off', 2, function suite(test) {
  casper.start(BASEURL + '/blog/2012/11/20/why-i-do-side-projects.html', function() {
    test.assertSelectorHasText('.post-date', '20 Nov 2012');
    test.assertNotExists('.message', 'Message does not exists.');
  }).run(function() {
    test.done();
  });
});
