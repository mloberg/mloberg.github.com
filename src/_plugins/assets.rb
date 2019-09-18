require 'json'

module Jekyll
  class AssetUrlTag < Liquid::Tag
    def initialize(tag_name, src, tokens)
      super
      @src = src.strip
    end

    def render(context)
      @src = context[@src[1..-1].strip] if @src.start_with? '@'
      context.registers[:site].config['_assets'].fetch(@src, @src)
    end
  end
end

Liquid::Template.register_tag('asset', Jekyll::AssetUrlTag)

Jekyll::Hooks.register(:site, :after_init) do |site|
  env = Jekyll.env == "production" ? "production" : "dev"
  raise RuntimeError unless system("./node_modules/.bin/encore #{env}")
end

Jekyll::Hooks.register(:site, :after_init) do |site|
  manifest = "src/assets/manifest.json"
  raise RuntimeError, "Manifest file #{manifest} not found." unless File.exists?(manifest)
  site.config['_assets'] = JSON.parse(File.read(manifest))
end

Jekyll::Hooks.register(:site, :post_write) do |site|
  if Jekyll.env == "production"
    raise RuntimeError unless system("./node_modules/.bin/purgecss --config ./purgecss.config.js --out dist/assets")
  end
end
