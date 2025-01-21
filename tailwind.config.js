import plugin from 'tailwindcss/plugin';
import typography from '@tailwindcss/typography';
import skipLink from 'tailwindcss-skip-link';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './assets/**/*.js',
    './content/**/*.{html,js,md}',
    './layouts/**/*.{html,js}',
  ],
  safelist: [{ pattern: /^hero-/ }],
  theme: {
    heroes: [
      'main',
      'i6VBVfcerso',
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
    typography,
    skipLink(),
    plugin(({ addComponents, theme }) => {
      const heroes = theme('heroes', []);
      const screens = theme('screens', {});
      delete screens['2xl'];

      addComponents(
        heroes.map((hero) => ({
          [`.hero-${hero}`]: {
            'background-image': `url("/images/hero/${hero}.webp")`,
          },
        })),
      );

      Object.entries(screens).forEach(([name, width]) => {
        addComponents({
          [`@media (min-width: ${width})`]: heroes.map((hero) => ({
            [`.hero-${hero}`]: {
              'background-image': `url("/images/hero/${hero}-${name}.webp")`,
            },
          })),
        });
      });
    }),
  ],
};
