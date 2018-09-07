const moment = require('moment');
const postTime = document.querySelector('time[itemprop="datePublished"]');

if (postTime) {
  const published = moment(postTime.getAttribute('datetime'));
  const outdated = moment().subtract(18, 'months');

  if (published.isBefore(outdated, 'day')) {
    const warning = document.createElement('div');
    warning.innerHTML = `<p>This article was published ${published.fromNow()}.
This means the content may be out of date or no longer relevant. You should
verify that any technical information in this article is still current before
relying upon it for your own purposes.</p>`;
    warning.classList.add('old-post-warning');

    document.querySelector('.post__meta').appendChild(warning);
  }
}
