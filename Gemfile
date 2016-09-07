source 'https://rubygems.org'

gem 'jekyll'

group :jekyll_plugins do
  gem 'jekyll-sitemap'
  gem 'jekyll-assets'
  gem 'jekyll-browsersync'
  gem 'jekyll-compose', :git => 'https://github.com/mloberg/jekyll-compose.git', :branch => 'feature/site-source-fix'
end

group :assets do
  gem 'autoprefixer-rails'
  gem 'bootstrap-sass'
  gem 'font-awesome-sass'
  gem 'image_optim'
  gem 'image_optim_pack'
end

group :production do
  gem 'htmlcompressor'
end

group :development do
  gem 'html-proofer'
  gem 's3_website'
end
