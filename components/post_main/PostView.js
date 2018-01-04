import React, {Component} from 'react'
const propTypes = {}

const defaultProps = {}
const InlineStyle = () => (
    <style>{`
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

class PostView extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        const {postInfo} = this.props
        return (
            <div className='Post'>
                <InlineStyle/>
                <h1 className='Title'>{postInfo.title}</h1>
                <h5 className='Date'>{postInfo.date}</h5>
                <hr/>
                <div dangerouslySetInnerHTML={{__html: postInfo.contents}}/>
            </div>
        );
    }
}

PostView.propTypes = propTypes;
PostView.defaultProps = defaultProps;

export default PostView;
