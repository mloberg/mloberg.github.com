require 'json'

module Jekyll
  class AssetUrlTag < Liquid::Tag
    def initialize(tag_name, src, tokens)
      super
      @src = src.strip
    end

    def render(context)
      manifest = context.registers[:site].config['assets']['manifest']
      manifest.key?(@src) ? manifest[@src] : @src
    end
  end
end

Jekyll::Hooks.register :site, :after_init do |site|
  assets = JSON.parse(File.read(site.config['assets']['manifest']))
  site.config['assets']['manifest'] = assets
end

Liquid::Template.register_tag('asset', Jekyll::AssetUrlTag)
