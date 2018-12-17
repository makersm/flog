import React from 'react';

const InlineStyle = () => (
    <style>{`
		.SubHeader {
			font-family: 'Nunito', cursive;
			font-size: 2rem;
			margin: 0 0 1rem 0;
			text-align: center;
		}
    `}</style>
);


const SubHeader = (props) => {
    const {name, style} = props;

    return (
        <div className="SubHeader" style={style}>
            <InlineStyle/>
            {name}
        </div>
    );
};

SubHeader.defaultProps = {
	style : {
		color : 'black',
	}
};

export default SubHeader;
