/** @type {import('prettier').Config} */
export default {
  singleQuote: true,
  plugins: ['prettier-plugin-go-template', 'prettier-plugin-tailwindcss'],
  overrides: [
    {
      files: ['*.html'],
      options: {
        parser: 'go-template',
      },
    },
  ],
};
