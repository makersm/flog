const path = require('path');
const {getDirTree, getBasePath, getPostsInfo, getAllPostsInfo, getPostInfo, getCurrentPostInfo} = require('./exec');
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

async function renderCategory(req, res, resolve, reject) {
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
            (errorMap) => { return reject(errorMap); }
        )
        .catch((err) => { console.error(err); return reject()});

    return render;
}

async function renderPost(req, res, resolve, reject) {
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
            (errorMap) => { return reject(errorMap); }
        )
        .catch((err) => { console.error(err); return reject(); });

    return render;
}

async function renderIndex(req, res, resolve, reject) {
    let dirJsonTree = getDirTree();
    let currentPostInfo = getCurrentPostInfo();

    let commonQueryParams = {dirJsonTree: dirJsonTree, postInfo: currentPostInfo};

    let render = await renderPage(res, dirJsonTree, currentPostInfo)
        .then(
            () => { return resolve(commonQueryParams); },
            (errorMap) => { return reject(errorMap); }
        )
        .catch((err) => { console.error(err); return reject(); });

    return render;
}

module.exports = {
    renderIndex,
    renderPost,
    renderCategory
}