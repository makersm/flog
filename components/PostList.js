import React from 'react'

const InlineStyle = () => (
    <style>{`
        hr {
            border-top: 1px dotted #8c8b8b;
            border-bottom: 1px dotted #fff;
        }
        .PostList {

        }
    `}</style>
)


const PostList = () => {
    return (
        <div className='PostList'>
            <InlineStyle/>
            'this is post list'
            <hr/>
        </div>
    );
};

export default PostList
