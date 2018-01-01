import React from 'react'
import {PostName} from '../../components'

const InlineStyle = () => (
    <style>{`
        .PostNameList {

        }
    `}</style>
)

const defaultProps = {
    postNames: []
}


const PostNameList = (props) => {
    const {postNames} = props
    return (
        <div className='PostNameList'>
            <InlineStyle/>
            {postNames.map((postName, i) => {
                //todo i is temperary key
                return <PostName name={postName} key={i}/>
            })}
        </div>
    );
};

PostNameList.defaultProps = defaultProps
export default PostNameList
