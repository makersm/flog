import React, {Component} from 'react'
import {SubHeader, ItemList, ContentsHeaderList} from '../index'
import {Sticky, Segment} from 'semantic-ui-react'

const propTypes = {}

const defaultProps = {}

const InlineStyle = () => (
    <style>{`
        .TableOfContents {
        }
    `}</style>
)

class TableOfContents extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const {context, contents} = this.props
        return (
            <div className='TableOfContents'>
                <InlineStyle/>
                <Sticky context={context}>
                    <Segment>
                        <SubHeader name='Table Of Contents'/>
                        <hr/>
                        <ContentsHeaderList contents={contents}/>
                    </Segment>
                </Sticky>
            </div>

        );
    }
}

TableOfContents.propTypes = propTypes
TableOfContents.defaultProps = defaultProps

export default TableOfContents
