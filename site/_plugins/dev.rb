if Jekyll.env == 'development'
  Jekyll::Hooks.register :site, :after_init do |site|
    site.config['url'] = nil
  end
end
