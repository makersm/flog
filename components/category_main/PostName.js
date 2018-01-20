import React from 'react';
import Link from 'next/link';

const InlineStyle = () => (
    <style>{`
        .PostName {
            cursor: pointer;
            font-size: 1.2rem;
        }
    `}</style>
);


const PostName = (props) => {
    const {name, id} = props;
    return (
        <div className='PostName'>
            <InlineStyle/>
            <Link prefetch href={{pathname: '/post', query: {path: id}}} as={`/post${id}`}>
                <a>
                    {name}
                </a>
            </Link>
            <hr/>
        </div>
    );
};


export default PostName;
