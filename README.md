# mlo.io

Jekyll site for [mlo.io](http://mlo.io)

## development

    npm install
    bundle install --path=vendor/bundle --jobs=4 --retry=3
    bundle exec jekyll serve

## writing a new post

1. `bundle exec jekyll draft "Post Name"`
2. Write
3. Find a hero image (usually from [Unsplash](https://unsplash.com/))
4. Generate hero images (`bin/hero IMAGE NAME`)
5. Add hero name to _tailwind.config.js_
6. Optimize images (`npm run optimize`)
7. Publish the draft (`bundle exec jekyll publish [path]`)
8. Commit & push
