# mlo.io

Jekyll site for [mlo.io](http://mlo.io)

## Develop

    make

## Test

    make test
    make test-report # to view test report if it failed
    make test-approve # to approve changes

## Publish

    make publish

## Creating a New Post

1. `make draft NAME=post-name`
2. Write the post
3. Proof it (`make proof`)
4. Find a hero image (usually from [Unsplash](https://unsplash.com/))
5. Save as `assets/images/hero-{id}.jpg`
6. Edit photo to be _1900px wide_
7. Run through [ImageOptim](http://imageoptim.com/)
8. Run any other post images through ImageOptim
9. Publish the draft (`make post DRAFT=path/to/draft`)
10. Update BackstopJS references (`make test && make test-report && make test-approve`)
11. Publish site (`make publish`)
12. 💵 Profit 💵
