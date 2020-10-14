const _ = require("lodash");

module.exports = {
  purge: {
    content: [
      "./src/**/*.html",
      "./src/**/*.md",
      "./assets/**/*.js",
    ],
    options: {
      whitelistPatterns: [/^hero-/],
    },
  },
  theme: {
    heroes: [
      "main",
      "i6VBVfcerso",
      "znT2Mwt9ypo",
      "hFzIoD0Fi8",
      "jb1Mc1lv8X0",
      "gE08jRp3Qw4",
      // additional hero images here
    ],
    fontFamily: {
      title: ["Raleway", "sans-serif"],
      sans: [
        "Montserrat",
        "-apple-system",
        "BlinkMacSystemFont",
        "Segoe UI",
        "Roboto",
        "Helvetica Neue",
        "Arial",
        "Noto Sans",
        "sans-serif",
      ],
    },
    typography: {
      dark: {
        css: {
          color: "#fff",
          h1: {
            color: "#e2e8f0",
          },
          h2: {
            color: "#e2e8f0",
          },
          h3: {
            color: "#e2e8f0",
          },
          h4: {
            color: "#e2e8f0",
          },
          h5: {
            color: "#e2e8f0",
          },
          h6: {
            color: "#e2e8f0",
          },
          a: {
            color: "#fff",
          },
          strong: {
            color: "#fff",
          },
          code: {
            color: "#e2e8f0",
          },
        },
      },
    },
    extend: {
      screens: {
        "dark": {"raw": "(prefers-color-scheme: dark)"},
      },
    },
  },
  variants: {},
  plugins: [
    require("@tailwindcss/typography"),
    require("tailwindcss-skip-link")(),
    function({ addComponents, theme }) {
      const screens = theme("screens", {});
      _.map(theme("heroes", []), hero => {
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
          { [`.hero-${hero}`]: { 'background-image': `url("/images/hero/${hero}.jpg")` } },
          ...mediaQueries
        ]);
      });
    },
  ],
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
    defaultLineHeights: true,
    standardFontWeights: true,
  },
};
