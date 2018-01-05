import React, {Component} from 'react'
import {ContentsHeader} from '../../components'

const InlineStyle = () => (
    <style>{`
        hr {
            border-top: 1px dotted #8c8b8b;
            border-bottom: 1px dotted #fff;
        }
        .ContentsHeaderList {

        }
    `}</style>
)

const defaultProps = {
    contentsHeaders: []
}


class ContentsHeaderList extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const {contentsHeaders} = this.props
        return (
            <div className='ContentsHeaderList'>
                <InlineStyle/>
                <hr/>
                {contentsHeaders.map((contentsHeader) => {
                    return <ContentsHeader name={contentsHeader.name} key={contentsHeader.path} id={contentsHeader.path}/>
                })}
            </div>
        )
    }
};

ContentsHeaderList.defaultProps = defaultProps
export default ContentsHeaderList
