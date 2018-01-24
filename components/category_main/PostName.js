import React from 'react';
import Link from 'next/link';
import Router from "next/router";

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

    function onClickHandler (href) {
        return (e) => {
            e.preventDefault();
            Router.push({
                pathname: '/post', query: {path: id}
            }, `/post${id}`);
        }
    }

    return (
        <div className='PostName'>
            <InlineStyle/>
            {/*<Link prefetch href={{pathname: '/post', query: {path: id}}} as={`/post${id}`}>*/}
                <a onClick={onClickHandler(`/post${id}`)}>
                    {name}
                </a>
            {/*</Link>*/}
            <hr/>
        </div>
    );
};


export default PostName;
