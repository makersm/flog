import React from 'react'
import {PostName} from '../../components'

const InlineStyle = () => (
    <style>{`
        .PostNameList {

        }
    `}</style>
)


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

export default PostNameList
