import React, {Component} from 'react';
import Fonts from '../static/Fonts'
import Page from '../layouts/main'
import {Post} from '../components'
import PostContainer from '../layouts/container'

const InlineStyle = () => (
    <style>{`
		body {
			background: #E0E0E0;
		}
	`}</style>
)

class Index extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        Fonts()
    }

    render() {
        const {dirJsonTree, dirPath, url} = this.props
        return (
            <Page dirJsonTree={dirJsonTree} dirPath={dirPath} url={url}>
                <InlineStyle/>
                <PostContainer>
                    <Post/>
                </PostContainer>
            </Page>
        )
    }
}

Index.getInitialProps = async function (context) {
    return context.query
}

export default Index;
