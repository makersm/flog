import React, {Component} from 'react';
import {SearchBar, DirList, SubHeader} from '../index';

const InlineStyle = () => (
    <style>{`
		.Category {
            float: left;
            width: 30rem;
            display: inline-block;
            padding:3rem 1rem 0 1rem;
            background-color: #b3b3cc;
		}
	`}</style>
);

class CategoryTab extends Component{

    constructor(props){
        super(props);
        this.state = { width: '0', height: '0' };
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
        this.setState({ width: document.body.scrollwidth, height: document.body.scrollHeight});
    }

    render() {
        const {dirJsonTree} = this.props;
        const {height} = this.state;

        return (
            <div className='Category' style={{height: height}}>
                <InlineStyle/>
                <SubHeader name='Category' style={{color: 'white'}}/>
                <SearchBar/>
                <DirList dirJsonTree={dirJsonTree}/>
            </div>
        );
    }
}

export default CategoryTab;
