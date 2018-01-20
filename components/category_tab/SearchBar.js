import React, {Component} from 'react';
import {Input, Icon} from 'semantic-ui-react';

const InlineStyle = () => (
    <style>{`
		.SearchBar {
            margin-bottom: 10px
		}
	`}</style>
);

class SearchBar extends Component {
    //TODO generate indicator at 1.1
    constructor(props) {
        super(props);
    }

    buttonClick = () => {
    }

    render() {
        return (
            <div className="SearchBar">
                <InlineStyle/>
                <Input
                    icon={<Icon name='search' inverted circular link onClick={this.buttonClick}/>}
                    placeholder='Search...'
                    fluid/>
            </div>
        );
    }
}

export default SearchBar;
