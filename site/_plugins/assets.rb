require "json"

module Jekyll
  class AssetUrlTag < Liquid::Tag
    def initialize(tag_name, src, tokens)
      super
      @src = src.strip
    end

    def render(context)
      assets = context.registers[:site].config['assets']

      assets.key?(@src) ? assets[@src] : @src
    end
  end
end

Jekyll::Hooks.register :site, :after_init do |site|
  assets = JSON.parse(File.read(site.config['assets']))

  site.config['assets'] = assets
end

Liquid::Template.register_tag('asset', Jekyll::AssetUrlTag)
