import React from 'react';

const InlineStyle = () => (
    <style>{`
		.SubHeader {
			font-family: 'Kalam', cursive;
			font-size: 2rem;
			margin: 0 0 1rem 0;
			text-align: center;
		}
    `}</style>
);

const SubHeader = (props) => {
    const {name} = props;

    return (
        <div className="SubHeader">
            <InlineStyle/>
            {name}
        </div>
    );
};

export default SubHeader;
