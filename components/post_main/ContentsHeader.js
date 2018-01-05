import React from 'react'
import Link from 'next/link'

const InlineStyle = () => (
    <style>{`
        .ContentsHeader {
            cursor: pointer;
            font-size: 1.2rem;
        }
    `}</style>
)


const ContentsHeader = (props) => {
    const {name, id} = props
    return (
        <div className='ContentsHeader'>
            <InlineStyle/>
                <a href={id}>
                    {name}
                </a>
            <hr/>
        </div>
    );
};


export default ContentsHeader
