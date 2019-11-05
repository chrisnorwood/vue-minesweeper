# vue-minesweeper
## About
This clone of the classic game, "Minesweeper", was built over a weekend using Vue.js 2.0.  It features a timer, multiple difficulty settings, and tile-flagging.  It is responsive with pure CSS media queries (though the grid itself is still a bit 'rigid' at this time).

This is my first real project using a newer Javascript framework, and I created this right after finishing [Maximilian Schwarzmüller's Vue Tutorial](https://www.udemy.com/vuejs-2-the-complete-guide).

## Live Demo:

[View Live](https://chrisnorwood.io/vue-minesweeper)

## Preview: 
![vue-minesweeper](https://cloud.githubusercontent.com/assets/18252139/20769454/d0252838-b6f6-11e6-9731-c76e4c111bbd.png)

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# Deploy '/dist' folder to heroku master
npm run deploy

# Deploy to gh-pages branch of repository, for serving via Github pages
git subtree push --prefix dist origin gh-pages
## webpack is hrefing assets to /static/... , rather than static/... , which breaks on gh-pages subdirectory,
## unless you manually update these in the dist/index folder before pushing
```


