import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Dir} from '../index'

const propTypes = {
    dirJsonTree: PropTypes.array,
    dirPath: PropTypes.string,
}

const defaultProps = {
    dirPath: ''
}


class DirList extends Component {

    constructor(props) {
        super(props)
    }

    hierarchicalArrangment(jsonTree, path) {
        return jsonTree.map(dir => {
            if (dir.contents.length !== 0) {
                return (
                    <div key={path + '/' + dir.name}>
                        <Dir name={dir.name} count={dir.fileCount} id={path + '/' + dir.name}/>
                        <DirList dirJsonTree={dir.contents} dirPath={path + '/' + dir.name}/>
                    </div>
                )
            } else {
                if(dir.type !== 'all')
                    return (
                        <Dir name={dir.name} count={dir.fileCount} key={path + '/' + dir.name} id={path + '/' + dir.name}/>
                    )
            }
        })
    }

    getAllComponent(jsonTree) {
        return jsonTree.map(dir => {
            if(dir.type === 'all')
                return (
                    <Dir name={dir.name} count={dir.fileCount} key={'/'} id={'/'}/>
                )
        })
    }

    render() {
        const {dirJsonTree, dirPath} = this.props
        let hierarchy = this.hierarchicalArrangment(dirJsonTree, dirPath)
        let allComponent = this.getAllComponent(dirJsonTree, dirPath)

        return (
            <div>
                <ul>
                    {allComponent}
                    {hierarchy}
                </ul>
            </div>
        )
    }
}

DirList.propTypes = propTypes
DirList.defaultProps = defaultProps
export default DirList
