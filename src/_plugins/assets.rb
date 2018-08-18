require 'json'

module Jekyll
  class AssetUrlTag < Liquid::Tag
    def initialize(tag_name, src, tokens)
      super
      @src = src.strip
    end

    def render(context)
      @src = context[@src[1..-1].strip] if @src.start_with? '@'
      manifest = context.registers[:site].config['assets']['manifest'] || {}
      manifest.key?(@src) ? manifest[@src] : @src
    end
  end
end

Jekyll::Hooks.register :site, :after_init do |site|
  manifest_path = site.config['assets']['json_manifest_path']
  site.config['assets']['manifest'] = JSON.parse(File.read(manifest_path)) if File.exists? manifest_path
end

Jekyll::Hooks.register :pages, :post_init do |page|
  image = page.data['image']
  manifest = page.site.config['assets']['manifest']
  page.data['image'] = manifest.key?(image) ? manifest[image] : image
end

Liquid::Template.register_tag('asset', Jekyll::AssetUrlTag)
