import React from 'react';

const InlineStyle = () => (
    <style>{`
        .Indicator {
            font-size: 1.2rem;
        }
    `}</style>
);

const Indicator = () => {
    //TODO generate indicator at 1.1
    return (
        <div className='Indicator'>
            <InlineStyle/>

        </div>
    );
};

export default Indicator;
