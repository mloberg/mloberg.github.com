import instantsearch from "instantsearch.js";
import {hits, searchBox} from "instantsearch.js/es/widgets";

import moment from 'moment';

require('../css/search.css');

class BlogSearch {
  constructor(options) {
    this.options = options;
    this.initialized = false;
  }

  show() {
    if (!this.initialized) {
      this.init();
      this.search.start();
      this.initialized = true;
    }

    this._removeClass(".js-search-show", "hidden");
    this._addClass(".js-search-hide", "hidden");
  }

  hide() {
    this.search.helper.setQuery('').search();
    this._addClass(".js-search-show", "hidden");
    this._removeClass(".js-search-hide", "hidden");
  }

  hitTemplate(hit) {
    let date = '';
    if (hit.date) {
      date = moment.unix(hit.date).format('MMMM D, YYYY');
    }

    let url = hit.url;
    if (hit.anchor) {
      url += `#${hit.anchor}`;
    }

    const title = hit._highlightResult.title.value;
    const content = hit._highlightResult.html.value;

    return `
      <article class="pb-4">
        <span class="block text-grey text-sm">${date}</span>
        <h4 class="font-normal"><a class="text-grey-darkest hover:text-blue transition-linear no-underline text-2xl" href="${url}">${title}</a></h4>
        <div class="post__content pt-2">
          ${content}
          <p class="-mt-6"><a href="${url}"><i class="fas fa-book-open"></i> View Post</a></p>
        </div>
      </article>
    `;
  }

  init() {
    this.search = instantsearch(this.options);
    this.search.addWidget(searchBox({
      container: '#search-box',
      poweredBy: true,
      reset: true
    }))
    this.search.addWidget(hits({
      container: '#search-hits',
      templates: {
        item: this.hitTemplate
      }
    }))
  }

  _addClass(selector, className) {
    const els = document.querySelectorAll(selector);

    [].forEach.call(els, el => {
      el.classList.add(className);
    });
  }

  _removeClass(selector, className) {
    const els = document.querySelectorAll(selector);

    [].forEach.call(els, el => {
      el.classList.remove(className);
    });
  }
};

window.BlogSearch = BlogSearch;
