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

function absolutePath(path, cwdPath) {
    path = `realpath ${ path }`;
    let result;

    if (cwdPath)
        result = childProcess.execSync(path, {cwd: cwdPath}).toString('utf-8');
    else
        result = childProcess.execSync(path).toString('utf-8');

    return result.slice(0, -1);
}

function loadFile(fileDir, file) {
    file = path.join(fileDir, file);
    const rawConfigs = fs.readFileSync(file, 'utf-8');
    const contents = JSON.parse(rawConfigs);

    return contents;
}

function JSONDirfilter(jsonTree) {
    for (var index = jsonTree.length - 1; index >= 0; index -= 1) {
        var data = jsonTree[index];
        if (data.type === 'directory') {
            var fileCount = data['contents'].filter((o) => {
                return o.type === 'file' && !imgReg.test(o.name);
            });
            data['fileCount'] = fileCount.length;

            if(data['contents'].length !== 0)
                JSONDirfilter(data['contents']);
        } else if (data.type !== 'directory') {
            jsonTree.splice(index, 1);
        }
    }

    return jsonTree;
}

function getBasePath() {
    const configDir = path.join(__dirname, CONFIG_DIR.join('/'));
    const contents = loadFile(configDir, 'config.json');
    const cwdPath = absolutePath(contents['root'], configDir);

    return cwdPath;
}

function getDirTree() {
    const basePath = getBasePath();

    let resultObj = childProcess.spawnSync('tree', ['-J'], {cwd: basePath});

    if(resultObj.error) {
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

// for category list
function getPostsInfo(basePath, param) {
    let cwdPath = path.join(basePath, param);
    let resultObj = childProcess.spawnSync('find',
        ['.', '-maxdepth', '1', '-type', 'f', '-printf', '%TY-%Tm-%Td-%TT%p\n'],
        {cwd: cwdPath});

    if(resultObj.error || resultObj.stdout === null) {
        let error = new Error();
        error.code = 404;
        return error;
    }

    let rawData = resultObj.stdout.toString('utf-8');

    if(!rawData)
        return [];

    let fileNamesWithPathAndDate = rawData.split(/[\n]/);
    fileNamesWithPathAndDate = fileNamesWithPathAndDate.filter((line) => {return line.length > 0});
    fileNamesWithPathAndDate.sort((a, b) => {
        return a > b ? 1 : -1;
    });

    let jsonFileNames = [];
    fileNamesWithPathAndDate.forEach((line) => {
        let n = line.split('./');
        let name = n[1];
        if(!imgReg.test(name))
            jsonFileNames.push({path: path.join(param, name), name: name});
    });

    return jsonFileNames
}

function getAllPostsInfo(cwdPath) {
    let returnObj = childProcess.spawnSync('find',
        ['.', '-type f', '-printf', '%TY-%Tm-%Td-%TT%p\n'],
        {cwd: cwdPath});

    if(returnObj.error) {
        let error = new Error();
        error.code = 500;
        return error;
    }

    if(!returnObj.stdout)
        return [];

    let fileNamesWithPathAndDate = returnObj.stdout.split(/[\n]/);
    fileNamesWithPathAndDate = fileNamesWithPathAndDate.filter((line) => {return line.length > 0});
    fileNamesWithPathAndDate.sort((a, b) => {
        return a > b ? 1 : -1;
    });

    let jsonFileNames = [];
    fileNamesWithPathAndDate.forEach((line) => {
        let n = line.split('/');
        let name = n[n.length-1];

        let cpath = line.split('./')[1];
        if(!imgReg.test(name))
            jsonFileNames.push({path: path.join('/', cpath), name: name});
    });

    return jsonFileNames;
}

function getAllPostsCount(cwdPath) {
    let rawFileNames = childProcess.execSync('find . -type f', {cwd: cwdPath}).toString('utf-8');
    let fileNames = rawFileNames.split('\n');

    fileNames = fileNames.filter((name) => {return name.length > 0 && !imgReg.test(name)});

    return fileNames.length;
}

function getPostInfo(basePath, param) {
    let allPath = path.join(basePath, param);
    let n = param.split('/');
    let name = n[n.length-1];
    let cwdPath = allPath.split(/\/[^\/]*$/)[0];

    let resultObj = childProcess.spawnSync('find',
        ['.', '-maxdepth', '1', '-name', name, '-type', 'f', '-printf', '%TY-%Tm-%Td\n'],
        {cwd: cwdPath});

    if(resultObj.error || !resultObj.stdout.toString('utf-8').trim()){
        let error = new Error();
        error.code = 404;
        return error;
    }

    let date = resultObj.stdout.toString('utf-8');
    let contents = readPost(cwdPath, name);

    return {title: name, date: date, contents: contents};

}

function readFile(cwdPath, name) {
    const file = path.join(cwdPath, name);
    const text = fs.readFileSync(file, 'utf-8');

    return text;
}

function readPost(cwdPath, name) {
    const text = readFile(cwdPath, name);
    const html = md.render(text);

    return `<article class='markdown-body'>${html}</article>`;

}

function getCurrentPostInfo() {
    let basePath = getBasePath();
    let jsonFileNames = getAllPostsInfo(basePath);
    if(jsonFileNames instanceof Error)
        return jsonFileNames;

    let currentPost = jsonFileNames[jsonFileNames.length-1];

    if(!currentPost)
        return {title: '', date: '', contents: ''};

    let cwdPath = path.join(basePath, currentPost.path).split(/\/[^\/]*$/)[0];

    let resultObj = childProcess.spawnSync('find',
        ['.', '-maxdepth', '1', '-name', currentPost.name, '-type', 'f', '-printf', '%TY-%Tm-%Td\n'],
        {cwd: cwdPath});
    let contents = readPost(cwdPath, currentPost.name);

    return {title: currentPost.name, date: resultObj.stdout.toString('utf-8'), contents: contents};
}

module.exports = {
    getDirTree,
    getBasePath,
    getPostsInfo,
    getAllPostsInfo,
    getPostInfo,
    getCurrentPostInfo,
};
