import React from 'react';

const InlineStyle = () => (
    <style>{`
		.profile {
		}
		.thumbnail {
			margin: 0 4vw 1.5vw 4vw;
			width: 12vw;
			height: 12vw;
		}
		.name {
			text-align:center;
			font-size: 1.5rem;
			font-family: 'Nunito';
			color: #fff;
		}
		.comment {
			margin: 0 1vw 0 1vw;
			font-size: 1.2rem;
			color: #eee;
			text-align:center;
		}
    `}</style>
);


const Profile = (props) => {
    const {img_path, name, comment} = props;

    return (
        <div className="profile">
            <InlineStyle/>
            <img className="thumbnail" src={img_path} alt='Thumbnail'/>
			<div>
				<p className="name">{name}</p>
				<p className="comment">{comment}</p>
			</div>
        </div>
    );
};

Profile.defaultProps = {
};

export default Profile;
