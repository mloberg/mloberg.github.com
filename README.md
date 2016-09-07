# mlo.io

Jekyll site for [mlo.io](http://mlo.io)

## Install

    bundle install --path vendor --standalone --deployment

## Build

    bundle exec jekyll build
    # Production mode
    JEKYLL_ENV=production bundle exec jekyll build

## Testing

    bundle exec htmlproof build

# License

The following directories and their contents are Copyright Matthew Loberg. You may not reuse anything therein without my permission:

* site/_posts/
* site/assets/images/

All other directories and files are MIT Licensed, unless otherwise specified in the file. Feel free to use the HTML and CSS as you please. If you do use them, a link back to http://github.com/mloberg would be appreciated, but is not required.

# TODO

* Minify JS/CSS in HTML
* CSSO (?)
* UnCSS (?)
