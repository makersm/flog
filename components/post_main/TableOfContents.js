import React, {Component} from 'react'
import {SubHeader, ItemList, ContentsHeaderList} from '../index'
import {Sticky, Segment} from 'semantic-ui-react'

const propTypes = {}

const defaultProps = {}

const InlineStyle = () => (
    <style>{`

    `}</style>
)

class TableOfContents extends Component {
    constructor(props) {
        super(props)

        this.state = {
            contentsHeaders: []
        }

    }

    getContentsHeaders() {
    }

    render() {
        const {context} = this.props
        console.log(context)

        return (
            <div>
                <InlineStyle/>
                <Sticky context={context}>
                    <Segment>
                        <SubHeader name='Table Of Contents'/>
                        {/*<ContentsHeaderList contentsHeaders = {contentsHeaders}/>*/}
                    </Segment>
                </Sticky>
            </div>

        );
    }
}

TableOfContents.propTypes = propTypes
TableOfContents.defaultProps = defaultProps

export default TableOfContents
