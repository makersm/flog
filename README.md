# flog

`flog` is an abbreviation for` File bLOG`, and it is a form of blog that manages all posts as files.

All pages in `flog` are based on server side rendering.

Post is automatically rendered when you create it based on `markdown`.

If you want to see the demo-site, visit [flog](https://flog.phople.us)

## Technology used

 - nextjs
 - reactjs
 - express
 - react-semantic-ui
 - almost of markdown-it plugins
 - axios
 - jquery
 - linux cli
 - github-markdown.css

## server requirement

 - linux OS
 - tree command (upper 1.7 version)
 - node 7.x or later (supports es6)

## Setup

1. Type `npm install` to install necessary npm package.
2. In `/ config / config.json`, "root" is required and indicates where post files will be saved. Write the location to be saved in `config.json`.
    - possible to write all the relative addresses, absolute addresses, `~`, and so on.
3. Type `npm start` to run server. Default port is `3000`.
    - If you want to change port, edit `server/index.js` file.
4. Enjoy it!

> **Note 1.** If you want to comment, please try social comment plugin like `disqus`


## How To Use

Type text based on markdown in `root`, then it will be automatically rendered.

(Supported items are the same as `Note 2. markdown-it plugin list`.)
- If directory is added to `root`, it is regarded as category classification. By default, `all` category exists and all files in the `root` directory of that post are displayed.
- If you want a picture to the post by custom, save it same directory, and using `[Alt='image-name'](IMAGENAME.PREFIX)`

> **Note 2. markdown-it plugin list**
>
> - subscript
> - superscript
> - footnote
> - definition list
> - abbreviation
> - emoji
> - insert
> - mark
> - toc-and-anchor
> - header-sections

## Support
### version 1.0
1. Support markdown rendering
2. Make table of contents(toc) automatically
2. Support for toc highlighting / link
3. Category classification support
4. By default, the index page is displayed as the most recent post

### version 1.01(current)
1. Treat error page perfectly

## Future support
1. Search function support
2. Added page indicator function of category
3. able to customize ui color and site title
