module.exports = {
    webpack: (config) => {
        // Fixes npm packages that depend on `fs` module
        config.node = {
            fs: 'empty',
        }
        return config
    },

    // exportPathMap: function () {
    //     return {
    //         '/': {page: `/index`},                              // Routes
    //         '/category': {page: `/category`},           // match
    //         '/post': {page: `/post`},  // by
    //     }
    // }
}
