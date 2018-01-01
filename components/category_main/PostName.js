import React from 'react'
import Link from 'next/link'

const InlineStyle = () => (
    <style>{`
        hr {
            border-top: 1px dotted #8c8b8b;
            border-bottom: 1px dotted #fff;
        }
        .PostName {

        }
    `}</style>
)


const PostName = (props) => {
    const {name} = props
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
