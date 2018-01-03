import React from 'react'
import Link from 'next/link'

const InlineStyle = () => (
    <style>{`
        .PostName {
            cursor: pointer;
        }
    `}</style>
)


const PostName = (props) => {
    const {name, id} = props
    return (
        <div className='PostName'>
            <InlineStyle/>
            {/*<Link prefetch href={{ pathname: '/post', query: { path: id }}}>*/}
                {name}
            {/*</Link>*/}
            <hr/>
        </div>
    );
};


export default PostName
