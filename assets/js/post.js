import moment from 'moment'

const placeholder = document.getElementById('old-post')

if (placeholder) {
  const timestamp = moment(placeholder.getAttribute('data-timestamp'))
  const duration = placeholder.getAttribute('data-old-after')

  if (timestamp.isBefore(moment().subtract(duration, 'months'))) {
      placeholder.innerHTML = `
  <div class="alert alert-warning">
    <p>
      This article was published on <strong>${timestamp.format('MMMM D, YYYY')}</strong>;
      more than <strong>${duration} months ago</strong>. This means the content
      may be out of date or no longer relevant. You should <strong>verify that
      the technical information in this article is still current</strong> before
      relying upon it for your own purposes.
    </p>
  </div>
  `;
  }
}
