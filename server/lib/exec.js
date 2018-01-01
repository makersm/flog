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

function getRootPath() {
    const configDir = path.join(__dirname, CONFIG_DIR.join('/'))
    const contents = loadFile(configDir, 'config.json')
    const cwdPath = absolutePath(contents['root'], configDir)

    return cwdPath
}

function getDirTree() {
    const cwdPath = getRootPath()

    let tree = childProcess.execSync('tree -J', {cwd: cwdPath}).toString('utf-8')
    let jsonTree = JSON.parse(tree)
    let jsonDirTree = JSONDirfilter(jsonTree)

    return jsonDirTree[0]['contents']
}

function getURL() {
    const configDir = path.join(__dirname, CONFIG_DIR.join('/'))
    const contents = loadFile(configDir, 'config.json')

    return contents['url'].toString('utf-8')
}

function getPostNames(cwdPath) {
    let fileNames = childProcess.execSync('ls -p | grep -v /', {cwd: cwdPath}).toString('utf-8')
    let jsonFileNames = fileNames.split(/[\n]+/);
    jsonFileNames = jsonFileNames.filter((name) => {return name.length > 0})

    console.log(jsonFileNames)
    return jsonFileNames
}

module.exports = {
    getDirTree,
    getRootPath,
    getPostNames
}
