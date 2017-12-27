import React, {Component} from 'react';
import PropTypes from 'prop-types';

const propTypes = {};

const defaultProps = {};
const InlineStyle = () => (
    <style>{`
		.Post {
		}

		.Post .Title {
			font-size: 3rem;
			display: inline;
		}

		.Post .Date {
			text-align: right;
			float:right;
			display: inline;
		}
	`}</style>
)

class Post extends Component {

    constructor(props) {
        super(props);
        this.state = {
            date: '2019-07-01'
        }
    }

    render() {
        const {date} = this.state;
        return (
            <div className='Post'>
                <InlineStyle/>
                <h1 className='Title'>Title</h1>
                <h5 className='Date'>{date}</h5>
                <hr/>
                <p>contents</p>
            </div>
        );
    }
}

Post.propTypes = propTypes;
Post.defaultProps = defaultProps;

export default Post;
