import React, {Component} from 'react'


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
		.footnotes {
          -moz-column-count: 2;
          -webkit-column-count: 2;
          column-count: 2;
        }
        .footnote-item>p {
          margin-top: 0 !important;
        }
	`}</style>
);

const defaultProps = {
    postInfo: {
        title : '',
        date: '',
        contents: ''
    }
};

class PostView extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const {postInfo} = this.props;

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

PostView.defaultProps = defaultProps;
export default PostView;
