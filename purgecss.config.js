module.exports = {
  content: ["./dist/**/*.html", "./dist/assets/**/*.js"],
  css: ["./dist/assets/**/*.css"],
  defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || []
};
