var WebFont = require('webfontloader');

WebFont.load({
  google: {
    families: ['Open+Sans:600,800', 'Roboto'],
  },
  custom: {
    families: ['fontawesome'],
    urls: [document.currentScript.src.replace('js/main.js', 'css/icons.css')],
  },
  classes: false,
  events: false,
});
