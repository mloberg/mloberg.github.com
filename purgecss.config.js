class TailwindExtractor {
  static extract(content) {
    return content.match(/[A-Za-z0-9-_:\/]+/g) || [];
  }
}

module.exports = {
  content: ['dist/**/*.html', 'dist/assets/*.js'],
  css: ['dist/assets/*.css'],
  extractors: [
    {
      extractor: TailwindExtractor,
      extensions: ['html', 'js']
    }
  ],
  whitelistPatterns: [/ais/],
}
