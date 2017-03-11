module Jekyll
  class AssetTag < Liquid::Tag

    Tags = {
      "css" => %(<link type="text/css" rel="stylesheet" href="%s"%s>),
      "js"  => %(<script type="text/javascript" src="%s"%s></script>),
      "img" => %(<img src="%s"%s>)
    }.freeze

    def initialize(tag, input, tokens)
      super
      @tag = tag.to_s
      @tokens = tokens

      args = input.split(" ")

      @path = args.shift
      @args = args.unshift(" ").join(" ").rstrip
    end

    def render(context)
      baseurl = context.registers[:site].config['baseurl']

      format(Tags[@tag], asset_url(baseurl), @args)
    end

    private
    def asset_url(prefix)
      "#{prefix}/assets/#{@tag}/#{@path}"
    end
  end
end

Jekyll::AssetTag::Tags.each_key do |tag|
  Liquid::Template.register_tag(tag, Jekyll::AssetTag)
end
