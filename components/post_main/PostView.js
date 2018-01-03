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

        // li>p{
        //     margin-bottom: 0;
        // }
        //
        // .line{
        //     margin-bottom: 0.3em;
        //     display: table;
        // }
        //
        // .admonition-title {
        //     font-size: 1.3em;
        //     font-weight: bold;
        // }
        //
        // aside{
        //     float: right;
        //     width: 20%;
        //     display: table;
        //     padding: 1em;
        //     margin: 1em;
        //     margin-right: 0;
        // }
        //
        // .footnote, .cite{
        //     width: 98%;
        //     display: table;
        //     border: 1px solid #ddd;
        //     padding: 0.5%;
        //     margin: 0.5%;
        // }
        //
        // .footnote .du-label, .cite .du-label{
        //     float: left;
        //     height: 100%;
        //     width: 5%;
        //     margin-right: 1em;
        //     padding: 0.5%;
        //     text-align: center;
        //     display: table;
        // }
        //
        // th, th p{
        //     font-weight: bold;
        // }
        //
        // .field-label{
        //     font-weight: bold;
        // }
        //
        // ol.arabic{
        //     list-style-type: decimal;
        // }
        //
        // ol.loweralpha{
        //     list-style-type: lower-alpha;
        // }
        //
        // ol.upperalpha{
        //     list-style-type: upper-alpha;
        // }
        //
        // ol.lowerroman{
        //     list-style-type: lower-roman;
        // }
        //
        // ol.upperroman{
        //     list-style-type: upper-roman;
        // }
        //
        // img.align-left{
        //     float: left;
        // }
        //
        // img.align-right{
        //     float: right;
        // }
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
