const path = require('path');
const {getDirTree, getBasePath, getPostsInfo, getAllPostsInfo, getPostInfo, getCurrentPostInfo} = require('./exec');
const imgReg = new RegExp(/\.(png|jpg|jpeg|gif|pdf|raw|svg|bmp)$/);

//######################################################################################################################
//##
//##
//##    Export Functions
//##
//##
//######################################################################################################################

/**
 * Url Pathname이 /category* 일때 렌더링하는 함수
 * (해당 디렉토리의 파일 리스트를 가져와 뿌려준다.)
 * @param req
 * @param res
 * @param resolve
 * @param reject
 */
function renderCategory(req, res, resolve, reject) {
    let param = req.originalUrl.split(/^\/category/)[1];
    param = decodeURIComponent(param);
    let basePath = getBasePath();

    //### 디렉토리 트리 가져오기
    let dirJsonTree = getDirTree();

    let postsInfo;
    if (!param || param === '/') //### 루트 디렉토리에 있을때
        postsInfo = getAllPostsInfo(basePath); //### 모든 파일 정보 가져오기
    else
        postsInfo = getPostsInfo(basePath, param); //### 해당 디렉토리의 파일 정보 가져오기

    let commonQueryParams = {dirJsonTree: dirJsonTree, postsInfo: postsInfo};

    renderPage(res, dirJsonTree, postsInfo)
        .then(
            () => { resolve(commonQueryParams); },
            (errorMap) => { reject(errorMap); }
        )
        .catch((err) => { console.error(err); reject()});
}

/**
 * Url Pathname이 /post* 일때 렌더링하는 함수
 * (해당 파일의 정보를 가져와 뿌려준다.)
 * @param req
 * @param res
 * @param resolve
 * @param reject
 */
function renderPost(req, res, resolve, reject) {
    let param = req.originalUrl.split(/^\/post/)[1];
    let basePath = getBasePath();

    if (imgReg.test(param)) {
        let postFix = imgReg.exec(param)[1];
        res.set('Content-Type', `image/${postFix}`);
        return res.sendFile(path.join(basePath, param));
    }

    //### 디렉토리 트리 가져오기
    let dirJsonTree = getDirTree();

    let postInfo;
    if (!param || param === '/') //### 루트 디렉토리에 있을때
        postInfo = getCurrentPostInfo(); //### 모든 파일 정보 가져오기
    else {
        postInfo = getPostInfo(basePath, param); //### 해당 디렉토리의 파일 정보 가져오기
    }

    let commonQueryParams = {dirJsonTree: dirJsonTree, postInfo: postInfo};

    renderPage(res, dirJsonTree, postInfo)
        .then(
            () => { resolve(commonQueryParams); },
            (errorMap) => { reject(errorMap); }
        )
        .catch((err) => { console.error(err); reject(); });
}

/**
 * Url Pathname이 / 일때 렌더링하는 함수
 * @param req
 * @param res
 * @param resolve
 * @param reject
 */
function renderIndex(req, res, resolve, reject) {
    let dirJsonTree = getDirTree();
    let currentPostInfo = getCurrentPostInfo();

    let commonQueryParams = {dirJsonTree: dirJsonTree, postInfo: currentPostInfo};

    renderPage(res, dirJsonTree, currentPostInfo)
        .then(
            () => { resolve(commonQueryParams); },
            (errorMap) => { reject(errorMap); }
        )
        .catch((err) => { console.error(err); reject(); });
}

//######################################################################################################################
//##
//##
//##     Non Export Function
//##
//##
//######################################################################################################################

/**
 * Data가 Error 인지 유무 판단
 * @param res
 * @param errorMap
 * @param data
 * @returns {boolean}
 */
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

/**
 * Page Render Function not belongs to page type
 * @param res
 * @param datas
 * @returns {Promise}
 */
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

module.exports = {
    renderIndex,
    renderPost,
    renderCategory
}