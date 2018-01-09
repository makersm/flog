import React from 'react'
import Link from 'next/link'

const InlineStyle = () => (
    <style>{`
        .ContentsHeader {
            color: gray;
        }
        .ContentsHeader a {
            color: gray;
        }
    `}</style>
)


const ContentsHeader = (props) => {
    const {name, id} = props
    return (
        <div className='ContentsHeader'>
            <InlineStyle/>
                <div dangerouslySetInnerHTML={{__html: name}}/>
        </div>
    );
};


export default ContentsHeader
