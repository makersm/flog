# flog

`flog` is an abbreviation for` File bLOG`, and it is a form of blog that manages all posts as files.
All pages in `flog` are based on server side rendering.
post is automatically rendered when you create it based on `markdown`.

### Technology used

 - nextjs
 - reactjs
 - express
 - react-semantic-ui
 - almost of markdown-it plugins
 - axios
 - jquery
 - linux cli

### server requirement

 - linux OS
 - tree command
 - node 7.x or later (supports es6)

### How To Use

1. In `/ config / config.json`, "root" is required and indicates where post files will be saved. Write the location to be saved in `config.json`.
    - possible to write all the relative addresses, absolute addresses, `~`, and so on.
2. Write the post content to `1`, (below it will be called `root`). The post content is automatically rendered when it is created with markdown. Supported items are the same as `Note 2. markdown-it plugin list`.
    - If directory is added to `root`, it is regarded as category classification. By default, all category exists and all files in the `root` directory of that post are displayed.
3. enjoy it

> **Note 1.** If you want to comment, please try social comment plugin like `disqus`
>
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




### Support
#### version 1.0(current)
1. Support markdown rendering
2. Support for toc highlighting / link
3. Category classification support
4. By default, the index page is displayed as the most recent post

### Future support
1. Search function support
2. Added page indicator function of category
3. If there is no `root` directory in post / post is not found, treated it as error all show nothing
4. able to customize ui color and site title
