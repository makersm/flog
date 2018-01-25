const express = require('express');
const next = require('next');
const path = require('path');

const {getDirTree, getBasePath, getPostsInfo, getAllPostsInfo, getPostInfo, getCurrentPostInfo} = require('./lib/exec');

const dev = process.env.NODE_ENV !== 'production';
const app = next({dev});
const handle = app.getRequestHandler();

const imgReg = new RegExp(/\.(png|jpg|jpeg|gif|pdf|raw|svg|bmp)$/);

function isOk(res, errorMap, data) {
    if (!(data instanceof Error)) {
        return true;
    } else {
        res.statusCode = data.code;
        res.statusMessage = data.message;
        errorMap['err'] = data;
        return false;
    }
}

function renderPage(res, ...datas) {
    let errorMap = {};
    let isOkStatement = true;

    for(let data of datas) {
        if(!isOk(res, errorMap, data)) {
            isOkStatement = false;
            break;
        }
    }

    return new Promise((resolve, reject) => {
        if (isOkStatement) {
            resolve();
        } else {
            reject(errorMap);
        }
    });
}

async function categoryRender(req, res, resolve) {
    let param = req.originalUrl.split(/^\/category/)[1];
    param = decodeURIComponent(param);
    let basePath = getBasePath();

    // checkpoint 1
    let dirJsonTree = getDirTree();

    // checkpoint 2
    let postsInfo;
    if (!param || param === '/')
        postsInfo = getAllPostsInfo(basePath);
    else
        postsInfo = getPostsInfo(basePath, param);

    let commonQueryParams = {dirJsonTree: dirJsonTree, postsInfo: postsInfo};

    let render = await renderPage(res, dirJsonTree, postsInfo)
        .then(
            () => { return resolve(commonQueryParams); },
            (errorMap) => { return app.render(req, res, '/_error', errorMap); }
        )
        .catch((err) => {
            console.error(err);
            return app.render(req, res, '/_error', {})});

    return render;
}

async function postRender(req, res, resolve) {
    let param = req.originalUrl.split(/^\/post/)[1];
    param = decodeURIComponent(param);
    let basePath = getBasePath();

    if (imgReg.test(param)) {
        let postFix = imgReg.exec(param)[1];
        res.set('Content-Type', `image/${postFix}`);
        return res.sendFile(path.join(basePath, param));
    }

    // checkpoint 1
    let dirJsonTree = getDirTree();

    // checkpoint 2
    let postInfo;
    if (!param || param === '/')
        postInfo = getCurrentPostInfo();
    else {
        postInfo = getPostInfo(basePath, param);
    }

    let commonQueryParams = {dirJsonTree: dirJsonTree, postInfo: postInfo};

    let render = await renderPage(res, dirJsonTree, postInfo)
        .then(
            () => { return resolve(commonQueryParams); },
            (errorMap) => { return app.render(req, res, '/_error', errorMap); }
        )
        .catch((err) => {
            console.error(err);
            return app.render(req, res, '/_error', {})});

    return render;
}

async function indexRender(req, res, resolve) {
    let dirJsonTree = getDirTree();
    let currentPostInfo = getCurrentPostInfo();

    let commonQueryParams = {dirJsonTree: dirJsonTree, postInfo: currentPostInfo};

    let render = await renderPage(res, dirJsonTree, currentPostInfo)
        .then(
            () => { return resolve(commonQueryParams); },
            (errorMap) => { return app.render(req, res, '/_error', errorMap); }
        )
        .catch((err) => {
            console.error(err);
            return app.render(req, res, '/_error', {})});

    return render;
}

app.prepare()
    .then(() => {
        const server = express();

        server.get('/_next*', (req, res) => {
            return handle(req, res);
        });

        server.get('/_webpack*', (req, res) => {
            return handle(req, res);
        });

        server.route('/category*')
            .get((req, res) => {
                return categoryRender(req, res,
                    (query) => { app.render(req, res, '/category', query); });
            })
            .post((req, res) => {
                return categoryRender(req, res,
                    (query) => { res.json(query); });
            });

        server.route('/post*')
            .get((req, res) => {
                return postRender(req, res,
                    (query) => { app.render(req, res, '/post', query); })
            })
            .post((req, res) => {
                return postRender(req, res,
                    (query) => { res.json(query); })
            });

        server.route('/')
            .get((req, res) => {
                return indexRender(req, res,
                    (query) => { app.render(req, res, '/', query); })
            })
            .post((req, res) => {
                return indexRender(req, res,
                    (query) => { res.json(query); })
            });

        server.use('/*\.(png|jpg|jpeg|gif|pdf|raw|svg|bmp)$', (req, res) => {
            let basePath = getBasePath();
            let name = decodeURIComponent(req.originalUrl);
            let postFix = imgReg.exec(name)[1];
            res.set('Content-Type', `image/${postFix}`);
            res.sendFile(path.join(basePath, name));
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
