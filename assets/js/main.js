const WebFont = require('webfontloader');

WebFont.load({
  google: {
    families: ['Open+Sans:600,800', 'Roboto'],
  },
  custom: {
    families: ['fontawesome'],
    urls: ['https://use.fontawesome.com/3236ff4b0c.css'],
  },
  classes: false,
  events: false,
});
