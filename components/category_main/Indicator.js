import React from 'react'

const InlineStyle = () => (
    <style>{`
        .Indicator {
            font-size: 1.2rem;
        }
    `}</style>
)

const Indicator = () => {
    return (
        <div className='Indicator'>
            <InlineStyle/>
            hello world
        </div>
    );
};

export default Indicator
