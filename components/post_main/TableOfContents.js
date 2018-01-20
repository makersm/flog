import React, {Component} from 'react';
import {SubHeader, ItemList, ContentsHeaderList} from '../index';
import {Sticky, Segment} from 'semantic-ui-react';

const InlineStyle = () => (
    <style>{`
        .TableOfContents {
        }
    `}</style>
);

class TableOfContents extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {context, currentHeaderId, contentsHeaders} = this.props;
        return (
            <div className='TableOfContents'>
                <InlineStyle/>
                <Sticky context={context}>
                    <Segment>
                        <SubHeader name='Table Of Contents'/>
                        <hr/>
                        <ContentsHeaderList currentHeaderId={currentHeaderId} contentsHeaders={contentsHeaders}/>
                    </Segment>
                </Sticky>
            </div>

        );
    }
}

export default TableOfContents;
