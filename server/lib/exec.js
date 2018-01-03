const path = require('path')
const childProcess = require('child_process')
const fs = require('fs')

const CONFIG_DIR = [
    '..',
    '..',
    'config'
]

function absolutePath(path, cwdPath) {
    path = `realpath ${ path }`
    let result

    if (cwdPath)
        result = childProcess.execSync(path, {cwd: cwdPath}).toString('utf-8')
    else
        result = childProcess.execSync(path).toString('utf-8')

    return result.slice(0, -1)
}

function loadFile(fileDir, file) {
    file = path.join(fileDir, file)
    const rawConfigs = fs.readFileSync(file, 'utf-8')
    const contents = JSON.parse(rawConfigs)

    return contents
}

function JSONDirfilter(jsonTree) {
    for (var index = jsonTree.length - 1; index >= 0; index -= 1) {
        var data = jsonTree[index]
        if (data.type === 'directory') {
            var fileCount = data['contents'].filter((o) => {
                return o.type === 'file'
            })
            data['fileCount'] = fileCount.length

            if(data['contents'].length !== 0)
                JSONDirfilter(data['contents'])
        } else if (data.type !== 'directory') {
            jsonTree.splice(index, 1)
        }
    }

    return jsonTree
}

function getBasePath() {
    const configDir = path.join(__dirname, CONFIG_DIR.join('/'))
    const contents = loadFile(configDir, 'config.json')
    const cwdPath = absolutePath(contents['root'], configDir)

    return cwdPath
}

function getDirTree() {
    const basePath = getBasePath()

    let tree = childProcess.execSync('tree -J', {cwd: basePath}).toString('utf-8')
    let jsonTree = JSON.parse(tree)
    let jsonDirTree = JSONDirfilter(jsonTree)
    jsonDirTree[0]['contents'].push({type: 'all', name: 'all', fileCount: getAllPostsCount(basePath), contents: []})

    return jsonDirTree[0]['contents']
}

function getPostsInfo(basePath, param) {
    let cwdPath = basePath+param
    let rawFileNames = childProcess.execSync('find . -maxdepth 1 -type f -printf \'%AY-%Am-%Ad%p\\n\'', {cwd: cwdPath}).toString('utf-8')

    if(!rawFileNames)
        return []

    let fileNamesWithPathAndDate = rawFileNames.split(/[\n]/);
    fileNamesWithPathAndDate = fileNamesWithPathAndDate.filter((line) => {return line.length > 0})
    fileNamesWithPathAndDate.sort((a, b) => {
        return a > b ? 1 : -1
    })
    let jsonFileNames = fileNamesWithPathAndDate.map((line) => {
        let n = line.split('./')
        let name = n[1]
        return {path: param+'/'+name, name: name}
    })

    return jsonFileNames
}

function getAllPostsInfo(cwdPath) {
    let rawFileNames = childProcess.execSync('find . -type f -printf \'%AY-%Am-%Ad%p\\n\'', {cwd: cwdPath}).toString('utf-8')

    if(!rawFileNames)
        return []

    let fileNamesWithPathAndDate = rawFileNames.split(/[\n]/)
    fileNamesWithPathAndDate = fileNamesWithPathAndDate.filter((line) => {return line.length > 0})
    fileNamesWithPathAndDate.sort((a, b) => {
        return a > b ? 1 : -1
    })
    let jsonFileNames = fileNamesWithPathAndDate.map((line) => {
        let n = line.split('/')
        let name = n[n.length-1]

        let path = line.split('.')[1]
        return {path: path, name: name}
    })

    return jsonFileNames
}

function getAllPostsCount(cwdPath) {
    let rawFileNames = childProcess.execSync('find . -type f', {cwd: cwdPath}).toString('utf-8')
    let fileNames = rawFileNames.split('\n')

    fileNames = fileNames.filter((name) => {return name.length > 0})

    return fileNames.length
}

function getPostInfo(basePath, param) {
    let allPath = basePath+param
    let n = param.split('/')
    let name = n[n.length-1]
    let cwdPath = allPath.split('/'+name)[0]

    let rawFileName = childProcess.execSync(`find . -maxdepth 1 -name ${name} -type f -printf \'%AY-%Am-%Ad%p\\n\'`, {cwd: cwdPath})
        .toString('utf-8').trim()
    let dateReg = new RegExp(/[0-9]{4}-[0-9]{2}-[0-9]{2}/)
    let date = dateReg.exec(rawFileName)

    let contents = readPost(cwdPath, name)

    return {title: name, date: date, contents: contents}

}

function readPost(cwdPath, name) {
    let htmlFileContents = childProcess.execSync(`rst2html5 ${name}`, {cwd: cwdPath}).toString('utf-8').trim()

    return htmlFileContents
}

module.exports = {
    getDirTree,
    getBasePath,
    getPostsInfo,
    getAllPostsInfo,
    getPostInfo
}
