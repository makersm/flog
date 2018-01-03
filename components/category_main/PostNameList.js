import React, {Component} from 'react'
import {PostName} from '../../components'

const InlineStyle = () => (
    <style>{`
        hr {
            border-top: 1px dotted #8c8b8b;
            border-bottom: 1px dotted #fff;
        }
        .PostNameList {

        }
    `}</style>
)

const defaultProps = {
    postsInfo: []
}


class PostNameList extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const {postsInfo} = this.props
        return (
            <div className='PostNameList'>
                <InlineStyle/>
                <hr/>
                {postsInfo.map((postInfo) => {
                    return <PostName name={postInfo.name} key={postInfo.path} id={postInfo.path}/>
                })}
            </div>
        )
    }
};

PostNameList.defaultProps = defaultProps
export default PostNameList
