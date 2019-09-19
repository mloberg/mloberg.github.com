const _ = require("lodash");

module.exports = {
  theme: {
    heroes: [
      "main",
      "i6VBVfcerso",
      "znT2Mwt9ypo",
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
    extend: {},
  },
  variants: {},
  plugins: [
    function({ addComponents, theme}) {
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
};
