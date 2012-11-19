task :default => 'generate:all'

task :generate do
  Rake::Task['generate:all'].execute
end

desc 'This is a blues riff in "B", watch me for the changes, and try and keep up, okay?'
task :develop do
  require "listen"

  # CSS listener
  Rake::Task['generate:css'].execute
  css = Listen.to('sass')
  css = css.change(&Proc.new {
    puts "Generating CSS"
    Rake::Task['generate:css'].execute
  })
  css.start(false)

  # JavaScript listener
  Rake::Task['generate:js'].execute
  js = Listen.to('coffeescript')
  js = js.change(&Proc.new {
    puts "Generating JavaScript"
    Rake::Task['generate:js'].execute
  })
  js.start(false)

  # Site
  # TODO: Figure out a way to not regenerate the site when an image updates
  Rake::Task['generate:site'].execute
  site = Listen.to('.')
  site = site.ignore(%r{^_site/})
  site = site.filter(/\.(md|markdown|textile|html|css|js|png|jpg)$/)
  site = site.change(&Proc.new {
    puts "Generating site"
    Rake::Task['generate:site'].execute
  })
  site.start(false)

  trap("INT") {
    css.stop
    js.stop
    site.stop
  }

  # Start the server
  Rake::Task['server'].execute
end

task :server do
  require 'webrick'
  include WEBrick

  mime_types = WEBrick::HTTPUtils::DefaultMimeTypes
  mime_types.store 'js', 'application/javascript'
  s = HTTPServer.new(
    :Port      => '4000',
    :MimeTypes => mime_types
  )
  s.mount('/', HTTPServlet::FileHandler, '_site')
  t = Thread.new {
    s.start
  }

  system "open http://localhost:4000"

  trap("INT") { s.shutdown }
  t.join()
end

namespace :generate do

  desc "Generate all site assets"
  task :all do
    Rake::Task['generate:css'].execute
    Rake::Task['generate:js'].execute
  end

  desc "Generate site with Jekyll"
  task :site do
    require 'jekyll'

    options = Jekyll.configuration({})
    site = Jekyll::Site.new(options)

    begin
      site.process
    rescue Jekyll::FatalException => e
      puts "Site could not be built:"
      puts e.message
      exit(1)
    end
    puts "Site generated."
  end

  desc "Generate site CSS"
  task :css do
    system "compass compile"
  end

  desc "Generate site JavaScript"
  task :js do
    File.delete('javascripts/site.js') if File.exists? 'javascripts/site.js'
    system "coffee --print coffeescript/ | yuicompressor --type js -o javascripts/site.js"
  end
end
