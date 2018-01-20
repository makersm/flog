import React from 'react';

const InlineStyle = () => (
    <style>{`
		.Header {
		    font-family: 'Kalam', cursive;
			background-color: #666699;
			color: white;
			font-size: 2rem;
			padding: 1.2rem;
			text-align: center;
			font-weight: 600;
		}
	`}</style>
);

const Header = (props) => {
    const {name} = props;
    return (
        <div className="Header">
            <InlineStyle/>
            {name}
        </div>
    );
};

export default Header;
