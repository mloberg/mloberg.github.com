require 'htmlcompressor'

compressor = HtmlCompressor::Compressor.new()
minify = proc { |doc| doc.output = compressor.compress(doc.output) if doc.output_ext == '.html' }

if Jekyll.env == 'production'
  Jekyll::Hooks.register :documents, :post_render, &minify
  Jekyll::Hooks.register :pages, :post_render, &minify
end
