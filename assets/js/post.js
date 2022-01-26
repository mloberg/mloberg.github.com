const twoYears = 63115200000;

(() => {
  const postTime = document.querySelector('time[itemprop="datePublished"]');
  if (!postTime) {
    return;
  }

  const now = new Date();
  const published = new Date(postTime.getAttribute('datetime'));

  if (now - published < twoYears) {
    return;
  }

  const warning = document.createElement('div');
  warning.innerHTML = `<p>This article was published more than two years ago.
This means the content may be out of date or no longer relevant. You should
verify that any technical information in this article is still current before
relying upon it for your own purposes.</p>`;
  warning.classList.add('old-post-warning');

  document.querySelector('.post__meta').appendChild(warning);
})();
