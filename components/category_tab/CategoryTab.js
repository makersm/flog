import React, {Component} from 'react';
import {SearchBar, DirList, SubHeader, Profile} from '../index';

const InlineStyle = () => (
    <style>{`
		.Category {
            float: left;
            width: 20vw;
            display: inline-block;
            background-color: #282828;
		}
	`}</style>
);

class CategoryTab extends Component {

    constructor(props) {
        super(props);
        this.state = {width: 0, height: 0};
        this.updateDocumentDimensions = this.updateDocumentDimensions.bind(this);
    }

    componentDidMount() {
        this.updateDocumentDimensions();
        document.addEventListener('resize', this.updateDocumentDimensions);
    }

    componentWillUnmount() {
        document.removeEventListener('resize', this.updateDocumentDimensions);
    }

    updateDocumentDimensions() {
        this.setState({
            width: window.document.scrollingElement.scrollWidth,
            height: window.document.scrollingElement.scrollHeight
        });
    }

    render() {
        const {dirJsonTree} = this.props;
        const {height} = this.state;
		const subHeaderStyle = {
			color: 'lightgray'
		};
		const upStyle = {
			padding: '3rem 0 1vw 0',
			'backgroundColor': '#0081cc'
		};
		const downStyle = {
            padding: '2rem 0.5vw 0 0.5vw'
		};

        return (
            <div className='Category' style={{height: height}}>
                <InlineStyle/>
				<div style={upStyle}>
					<Profile img_path='/static/user.png' name='makersm' comment='안녕하세요 :)'/>
				</div>
				<div style={downStyle}>
					<SearchBar/>
					<DirList dirJsonTree={dirJsonTree}/>
				</div>
            </div>
        );
    }
}

export default CategoryTab;
