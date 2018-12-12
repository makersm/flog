const path = require('path');
const childProcess = require('child_process');
const fs = require('fs');
const md = require('markdown-it')({
    html: true,
    linkify: true,
    typographer: true,
    breaks: false,
})
    .use(require('markdown-it-emoji'))
    .use(require('markdown-it-footnote'))
    .use(require('markdown-it-sub'))
    .use(require('markdown-it-sup'))
    .use(require('markdown-it-abbr'))
    .use(require('markdown-it-ins'))
    .use(require('markdown-it-mark'))
    .use(require('markdown-it-deflist'))
    .use(require('markdown-it-toc-and-anchor').default)
    .use(require('markdown-it-header-sections'));


const CONFIG_DIR = [
    '..',
    '..',
    'config'
];

const imgReg = new RegExp(/\.(png|jpg|jpeg|gif|pdf|raw|svg|bmp)$/);

//######################################################################################################################
//##
//##
//##    Export Functions
//##
//##
//######################################################################################################################

/**
 * 해당 디렉토리안의 포스트들의 정보를 가져온다
 * @param basePath
 * @param param
 * @returns Error || JsonArray
 * JsonArray :: [ {path: ..., name: ...}, ... ]
 */
function getPostsInfo(basePath, param) {
    let cwdPath = path.join(basePath, param);
    //### 해당 디렉토리안의 파일 확인(작성일, 이름)
    //#### ex) 2018-12-10-15:24:20.4010066100./helloworld
    let resultObj = childProcess.spawnSync('find',
        ['.', '-maxdepth', '1', '-type', 'f', '-printf', '%TY-%Tm-%Td-%TT%p\n'],
        {cwd: cwdPath});

    //### 에러 체킹
    if (resultObj.error || resultObj.stdout === null) {
        let error = new Error();
        error.code = 404;
        return error;
    }

    let rawData = resultObj.stdout.toString('utf-8');

    if (!rawData)
        return [];

    let fileNamesWithPathAndDate = rawData.split(/[\n]/);

    //### 빈 라인 필터
    fileNamesWithPathAndDate = fileNamesWithPathAndDate.filter((line) => {
        return line.length > 0
    });

    //### 시간순으로 정렬
    fileNamesWithPathAndDate.sort((a, b) => {
        return a > b ? 1 : -1;
    });

    let jsonFileNames = [];
    fileNamesWithPathAndDate.forEach((line) => {
        let n = line.split('./');
        let name = n[1];
        if (!imgReg.test(name))
            jsonFileNames.push({path: path.join(param, encodeURIComponent(name)), name: name}); //### 파일 이름 인코딩(특수문자 허가)
    });

    return jsonFileNames
}

/**
 * 해당 디렉토리와 하위 디렉토리의 모든 포스트의 정보를 가져온다.
 * @param cwdPath
 * @returns Error || JsonArray
 * JsonArray :: [ {path: ..., name: ...}, ... ]
 */
function getAllPostsInfo(cwdPath) {
    //### 해당 디렉토리 및 하위 디렉토리들의 파일 확인(작성일, 이름)
    //#### ex) 2018-12-10-15:24:20.4010066100./helloworld
    let returnObj = childProcess.spawnSync('find',
        ['.', '-type', 'f', '-printf', '%TY-%Tm-%Td-%TT%p\n'],
        {cwd: cwdPath});

    //### 에러 체킹
    if (returnObj.error) {
        let error = new Error();
        error.code = 500;
        return error;
    }

    if (!returnObj.stdout) {
        return [];
    }

    //### 빈 라인 필터
    let fileNamesWithPathAndDate = returnObj.stdout.toString('utf-8').split(/[\n]/);
    fileNamesWithPathAndDate = fileNamesWithPathAndDate.filter((line) => {
        return line.length > 0
    });

    //### 시간순으로 정렬
    fileNamesWithPathAndDate.sort((a, b) => {
        return a > b ? 1 : -1;
    });

    let jsonFileNames = [];
    fileNamesWithPathAndDate.forEach((line) => {
        let n = line.split('/');
        let name = n[n.length - 1];

        let cpath = line.split('./')[1];

        let pathLine = cpath.split('/');
        let pathLineExceptName = pathLine.slice(0, pathLine.length-1);
        pathLineExceptName.push(encodeURIComponent(name)); //### 파일 이름 인코딩(특수문자 허가)
        if (!imgReg.test(name))
            jsonFileNames.push({path: path.join('/', pathLineExceptName.join('/')), name: name});
    });

    return jsonFileNames;
}

/**
 * 해당 디렉토리와 하위 디렉토리의 모든 포스트의 개수를 가져온다.
 * @param cwdPath
 * @returns {*}
 */
function getAllPostsCount(cwdPath) {
    //#### ex1) ./helloworld
    //#### ex2) ./develop/[react 1일차] 리엑트를 공부해보자
    let rawFileNames = childProcess.execSync('find . -type f', {cwd: cwdPath}).toString('utf-8');
    let fileNames = rawFileNames.split('\n');

    fileNames = fileNames.filter((name) => {
        return name.length > 0 && !imgReg.test(name)
    });

    return fileNames.length;
}

/**
 * 포스트 정보를 가져온다.
 * @param basePath
 * @param param
 * @returns Error || Json
 * Json :: {title: ..., date: ..., contents: ...}
 */
function getPostInfo(basePath, param) {
    let allPath = path.join(basePath, param);
    let n = param.split('/');
    let name = decodeURIComponent(n[n.length - 1]); //### url decoding
    let cliName = name.replace(/[!@#$%^&*()+=\-[\]\\';,.\s/{}|":<>?~_]/g, "\\$&"); //### 직접 커맨드 입력하므로 특수문자앞에 \처리
    let cwdPath = allPath.split(/\/[^\/]*$/)[0];

    let resultObj = childProcess.spawnSync('find',
        ['.', '-maxdepth', '1', '-name', cliName, '-type', 'f', '-printf', '%TY-%Tm-%Td\n'],
        {cwd: cwdPath});

    if (resultObj.error || !resultObj.stdout.toString('utf-8').trim()) {
        let error = new Error();
        error.code = 404;
        return error;
    }

    let date = resultObj.stdout.toString('utf-8');
    let contents = readPost(cwdPath, name);

    return {title: name, date: date, contents: contents};

}

/**
 * 현재 위치에서의 포스트 정보를 가져온다.
 * @returns Error || Json
 * Json :: {title: ..., date: ..., contents: ...}
 */
function getCurrentPostInfo() {
    let basePath = getBasePath();
    let jsonFileNames = getAllPostsInfo(basePath);
    if (jsonFileNames instanceof Error) return jsonFileNames;

    let currentPost = jsonFileNames[jsonFileNames.length - 1];
    if (!currentPost) return {title: '', date: '', contents: ''};

    let name = decodeURIComponent(currentPost.name); //### url decoding
    let cwdPath = path.join(basePath, currentPost.path).split(/\/[^\/]*$/)[0];
    let resultObj = childProcess.spawnSync('find',
        ['.', '-maxdepth', '1', '-name', name, '-type', 'f', '-printf', '%TY-%Tm-%Td\n'],
        {cwd: cwdPath});
    let contents = readPost(cwdPath, name);

    return {title: name, date: resultObj.stdout.toString('utf-8'), contents: contents};
}

/**
 * 디렉토리 트리(전체 + 세부 디렉토리 트리) 가져오기
 * @returns Error || JsonArray
 * JsonArray :: [ {type: ..., name: ..., fileCount: ..., contents: [ 재귀 ]}, ... ]
 */
function getDirTree() {
    const basePath = getBasePath();

    let resultObj = childProcess.spawnSync('tree', ['-J'], {cwd: basePath});

    if (resultObj.error) {
        let error = new Error();
        error.code = 500;
        return error;
    }

    let tree = resultObj.stdout.toString('utf-8');
    let jsonTree = JSON.parse(tree);
    let jsonDirTree = JSONDirfilter(jsonTree);
    jsonDirTree[0]['contents'].push({type: 'all', name: 'all', fileCount: getAllPostsCount(basePath), contents: []});

    return jsonDirTree[0]['contents'];
}

/**
 * Config File에 명시한 Base Directory 표기
 * @returns String Base Directory의 절대경로
 */
function getBasePath() {
    const configDir = path.join(__dirname, CONFIG_DIR.join('/'));
    const contents = loadFile(configDir, 'config.json');
    const cwdPath = absolutePath(contents['root'], configDir);

    return cwdPath;
}

//######################################################################################################################
//##
//##
//##     Non Export Function
//##
//##
//######################################################################################################################

/**
 * 절대경로 위치 표기
 * @param path
 * @param cwdPath
 * @return String 절대경로
 */
function absolutePath(path, cwdPath) {
    path = `readlink -f ${ path }`;
    let result;

    if (cwdPath)
        result = childProcess.execSync(path, {cwd: cwdPath}).toString('utf-8');
    else
        result = childProcess.execSync(path).toString('utf-8');

    return result.slice(0, -1);
}

/**
 * 기본 디렉토리의 파일 로드
 * @param fileDir
 * @param file
 */
function loadFile(fileDir, file) {
    file = path.join(fileDir, file);
    const rawConfigs = fs.readFileSync(file, 'utf-8');
    const contents = JSON.parse(rawConfigs);

    return contents;
}

/**
 * 디렉토리 구조를 파악하는 실질적인 함수
 * @param jsonTree
 * @returns JsonArray
 * JsonArray :: [ {type: ..., name: ..., contents: [ 재귀 ], fileCount: ...}, ... ]
 * @constructor
 */
function JSONDirfilter(jsonTree) {
    for (var index = jsonTree.length - 1; index >= 0; index -= 1) {
        var data = jsonTree[index];
        if (data.type === 'directory') {
            var fileCount = data['contents'].filter((o) => {
                return o.type === 'file' && !imgReg.test(o.name);
            });
            data['fileCount'] = fileCount.length;

            if (data['contents'].length !== 0)
                JSONDirfilter(data['contents']);
        } else if (data.type !== 'directory') {
            jsonTree.splice(index, 1);
        }
    }

    return jsonTree;
}

/**
 * 실제로 file을 읽는 함수
 * @param cwdPath
 * @param name 실제 파일 이름
 */
function readFile(cwdPath, name) {
    const file = path.join(cwdPath, name).trim();
    const text = fs.readFileSync(file, 'utf-8');

    return text;
}

/**
 * 읽은 파일을 마크다운으로 랜더링
 * @param cwdPath
 * @param name
 * @returns {string}
 */
function readPost(cwdPath, name) {
    const text = readFile(cwdPath, name);
    const html = md.render(text);

    return `<article class='markdown-body'>${html}</article>`;

}

module.exports = {
    getDirTree,
    getBasePath,
    getPostsInfo,
    getAllPostsInfo,
    getPostInfo,
    getCurrentPostInfo,
};
