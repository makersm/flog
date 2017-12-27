import React, {Component} from 'react';
import {SubHeader, FileList} from './index';
import {Sticky, Segment} from 'semantic-ui-react'

const propTypes = {};

const defaultProps = {};

const InlineStyle = () => (
    <style>{`

    `}</style>
)

class TableOfContents extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {context} = this.props

        return (
            <div>
                <InlineStyle/>
                <Sticky context={context}>
                    <Segment>
                        <SubHeader name='Table Of Contents'/>
                    </Segment>
                </Sticky>
            </div>

        );
    }
}

TableOfContents.propTypes = propTypes;
TableOfContents.defaultProps = defaultProps;

export default TableOfContents;
