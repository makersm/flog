import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Item} from './index'

const propTypes = {
    dirJsonTree: PropTypes.array,
    dirPath: PropTypes.string,
}


class ItemList extends Component {

    constructor(props) {
        super(props)
    }

    hierarchicalArrangment(jsonTree, path) {
        return jsonTree.map(dir => {
            if (dir.contents.length !== 0) {
                return (
                    <div key={path + '/' + dir.name}>
                        <Item name={dir.name} count={dir.fileCount} id={path + '/' + dir.name}/>
                        <ItemList dirJsonTree={dir.contents} dirPath={path + '/' + dir.name}/>
                    </div>
                )
            } else {
                return (
                    <Item name={dir.name} count={dir.fileCount} key={path + '/' + dir.name} id={path + '/' + dir.name}/>
                )
            }
        })
    }

    render() {
        const {dirJsonTree, dirPath, url} = this.props
        var hierarchy = this.hierarchicalArrangment(dirJsonTree, dirPath)

        return (
            <div>
                <ul>
                    {hierarchy}
                </ul>
            </div>
        )
    }
}

ItemList.propTypes = propTypes
export default ItemList
