import React, {Component} from 'react';
import Fonts from '../static/Fonts'
import Page from '../layouts/main'
import PostListContainer from '../layouts/container'
import axios from 'axios'
import {PostList} from '../components'

const InlineStyle = () => (
    <style>{`
		body {
			background: #E0E0E0;
		}
	`}</style>
)

class Category extends Component {
    constructor(props) {
        super(props)

        if (this.props)
            this.state = this.props
    }

    componentDidMount() {
        Fonts()
    }

    render() {
        const {dirJsonTree, dirPath} = this.state
        return (
            <Page dirJsonTree={dirJsonTree} dirPath={dirPath}>
                <InlineStyle/>
                <PostListContainer>
                    <PostList/>
                </PostListContainer>
            </Page>
        )
    }
}

Category.getInitialProps = async function (context) {
    if(context.query['dirJsonTree'])
        return context.query
    else {
        const config = {headers: {'http_x_requested_with': 'axios'}}
        //TODO how to set url
        const responseData = axios.get('http://localhost:3000', config)
            .then((res) => {
                return res.data
            })
        return responseData
    }
}

export default Category;
