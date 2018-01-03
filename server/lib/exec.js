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
    let rawFileNames = childProcess.execSync('find . -maxdepth 1 -type f', {cwd: cwdPath}).toString('utf-8')

    if(!rawFileNames)
        return []

    let fileNamesWithPath = rawFileNames.split(/[\n]/);
    fileNamesWithPath = fileNamesWithPath.filter((line) => {return line.length > 0})
    let jsonFileNames = fileNamesWithPath.map((line) => {
        let n = line.split('./')
        let name = n[1]
        return {path: param+'/'+name, name: name}
    })

    return jsonFileNames
}

function getAllPostsInfo(cwdPath) {
    let rawFileNames = childProcess.execSync('find . -type f', {cwd: cwdPath}).toString('utf-8')

    if(!rawFileNames)
        return []

    let fileNamesWithPath = rawFileNames.split(/[\n]/)
    fileNamesWithPath = fileNamesWithPath.filter((line) => {return line.length > 0})
    let jsonFileNames = fileNamesWithPath.map((line) => {
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

function readPost() {
    console.log(cwdPath)

    let fileNames = childProcess.execSync('ls --full-time -t -r | grep \'^-\'', {cwd: cwdPath}).toString('utf-8').trim()

    if(!fileNames)
        return []

    let jsonFileNames = fileNames.split(/[\n]/);
    let dateReg = new RegExp(/[0-9]{4}-[0-9]{2}-[0-9]{2}/)
    let nameWithUTCReg = new RegExp(/(\+|\-)[0-9]{4}[\s].*/)
    jsonFileNames = jsonFileNames.map((line) => {
        let date = dateReg.exec(line)
        let nameWithUTC = nameWithUTCReg.exec(line)
        let name = nameWithUTC[0].split(/(\+|\-)[0-9]{4}[\s]/)
        return {date: date[0], name: name[0]}
    })

    return jsonFileNames

}
module.exports = {
    getDirTree,
    getBasePath,
    getPostsInfo,
    getAllPostsInfo
}
