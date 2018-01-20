const express = require('express');
const next = require('next');
const path = require('path');

const {getDirTree, getBasePath, getPostsInfo, getAllPostsInfo, getPostInfo, getCurrentPostInfo} = require('./lib/exec');

const dev = process.env.NODE_ENV !== 'production';
const app = next({dev});
const handle = app.getRequestHandler();

function ifErrorOccurRenderErrorPage(req, res, errorData, url) {
    if (errorData instanceof Error) {
        res.statusCode = errorData.code;
        res.statusMessage = errorData.message;
        return app.renderError(null, req, res, url, {err: errorData});
    }
}

app.prepare()
    .then(() => {
        const server = express();
        let imgReg = new RegExp(/\.(png|jpg|jpeg|gif|pdf|raw|svg|bmp)$/);

        server.get('/_next*', (req, res) => {
            return handle(req, res);
        });

        server.get('/_webpack*', (req, res) => {
            return handle(req, res);
        });

        server.get('/category*', (req, res) => {
            let param = req.originalUrl.split(/^\/category/)[1];
            param = decodeURIComponent(param);
            let basePath = getBasePath();

            let dirJsonTree = getDirTree();
            ifErrorOccurRenderErrorPage(req, res, dirJsonTree, '/category');

            let commonQueryParams = {dirJsonTree: dirJsonTree};

            let postsInfo;
            if (!param || param === '/')
                postsInfo = getAllPostsInfo(basePath);
            else
                postsInfo = getPostsInfo(basePath, param);
            ifErrorOccurRenderErrorPage(req, res, postsInfo, '/category');

            commonQueryParams['postsInfo'] = postsInfo;

            if (req.get('http_x_requested_with')) {
                res.send(commonQueryParams);
            } else {
                return app.render(req, res, '/category', commonQueryParams);
            }
        });

        server.get('/post*', (req, res) => {
            let param = req.originalUrl.split(/^\/post/)[1];
            param = decodeURIComponent(param);
            let basePath = getBasePath();

            ////// send img file ///////////////////////////////////////
            if (imgReg.test(param)) {
                let postFix = imgReg.exec(param)[1];
                res.set('Content-Type', `image/${postFix}`);
                res.sendFile(path.join(basePath, param));
            }

            ////// send text ////////////////////////////////////////////
            let commonQueryParams = {dirJsonTree: getDirTree()};

            let postInfo;
            if (!param || param === '/')
                postInfo = getCurrentPostInfo();
            else {
                postInfo = getPostInfo(basePath, param);
            }
            ifErrorOccurRenderErrorPage(req, res, postInfo, '/post');

            commonQueryParams['postInfo'] = postInfo;

            if (req.get('http_x_requested_with')) {
                res.send(commonQueryParams);
            } else {
                return app.render(req, res, '/post', commonQueryParams);
            }
        })

        server.use('/*\.(png|jpg|jpeg|gif|pdf|raw|svg|bmp)$', (req, res) => {
            let basePath = getBasePath();
            let name = decodeURIComponent(req.originalUrl);
            let postFix = imgReg.exec(name)[1];
            res.set('Content-Type', `image/${postFix}`);
            res.sendFile(path.join(basePath, name));
        });

        server.get('/', (req, res) => {
            let dirJsonTree = getDirTree();
            ifErrorOccurRenderErrorPage(req, res, dirJsonTree, '/');

            let commonQueryParams = {dirJsonTree: dirJsonTree, postInfo: getCurrentPostInfo()};

            if (req.get('http_x_requested_with')) {
                return res.send(commonQueryParams);
            } else {
                return app.render(req, res, req.originalUrl, commonQueryParams);
            }
        });

        server.get('*', (req, res) => {
            return app.render(req, res, '/_error', req.query);
        });

        server.listen(3000, (err) => {
            if (err) throw err;
            console.log('> Ready on http://localhost:3000');
        });
    })
    .catch((ex) => {
        console.error(ex.stack);
        process.exit(1);
    });
