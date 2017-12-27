import React, {Component} from 'react';
import {WrapContainer} from '../containers'
import Fonts from '../static/Fonts'
import Page from '../layouts/main'

const InlineStyle = () => (
    <style>{`
		body {
			background: #E0E0E0;
		}
		.WrapContainer {
			margin: 0 3rem 0 3rem;
		}
	`}</style>
)

class Category extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        Fonts()
    }

    render() {
        const {dirJsonTree, dirPath, url} = this.props
        return (
            <Page dirJsonTree={dirJsonTree} dirPath={dirPath}>
                <InlineStyle/>
                <WrapContainer/>
            </Page>
        )
    }
}

Category.getInitialProps = async function (context) {
    return context.query
}

export default Category;
