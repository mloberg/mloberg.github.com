const _ = require('lodash');

module.exports = {
  content: [
    './assets/**/*.js',
    // https://tailwindcss.com/docs/content-configuration#styles-rebuild-in-an-infinite-loop
    './src/_includes/**/*.html',
    './src/_layouts/**/*.html',
    './src/_posts/**/*.{html,md}',
    './src/talks/**/*.{html,md}',
    './src/404.html',
    './src/index.html',
    './src/name.html',
    './src/secrets.html',
  ],
  safelist: [{ pattern: /^hero-/ }],
  theme: {
    heroes: [
      'main',
      'i6VBVfcerso',
      'znT2Mwt9ypo',
      'hFzIoD0Fi8',
      'jb1Mc1lv8X0',
      'gE08jRp3Qw4',
      // additional hero images here
    ],
    fontFamily: {
      title: ['Raleway', 'sans-serif'],
      sans: [
        'Montserrat',
        '-apple-system',
        'BlinkMacSystemFont',
        'Segoe UI',
        'Roboto',
        'Helvetica Neue',
        'Arial',
        'Noto Sans',
        'sans-serif',
      ],
    },
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('tailwindcss-skip-link')(),
    function ({ addComponents, theme }) {
      const screens = _.omit(theme('screens', {}), ['dark', '2xl']);
      _.map(theme('heroes', []), (hero) => {
        const mediaQueries = _.map(screens, (width, name) => {
          return {
            [`@media (min-width: ${width})`]: {
              [`.hero-${hero}`]: {
                'background-image': `url("/images/hero/${hero}-${name}.jpg")`,
              },
            },
          };
        });

        addComponents([
          {
            [`.hero-${hero}`]: {
              'background-image': `url("/images/hero/${hero}.jpg")`,
            },
          },
          ...mediaQueries,
        ]);
      });
    },
  ],
};
