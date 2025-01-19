/** @type {import('prettier').Config} */
export default {
  singleQuote: true,
  plugins: ['prettier-plugin-go-template', 'prettier-plugin-tailwindcss'],
  overrides: [
    {
      files: ['*.html', 'layouts/index.json'],
      options: {
        parser: 'go-template',
      },
    },
  ],
};
