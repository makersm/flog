import React, {Component} from 'react';
import Fonts from '../static/Fonts'
import Page from '../layouts/main'
import {PostView} from '../components'
import PostContainer from '../layouts/container'
import axios from 'axios'
import Error from './_error'

const InlineStyle = () => (
    <style>{`
		body {
			background: #E0E0E0;
		}
	`}</style>
)

class Post extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        Fonts()
    }

    render() {
        const {dirJsonTree, postInfo, errorMsg} = this.props
        if(errorMsg) return <Error errorMsg={errorMsg}/>
        return (
            <Page dirJsonTree={dirJsonTree}>
                <InlineStyle/>
                <PostContainer contents={postInfo.contents}>
                    <PostView postInfo={postInfo}/>
                </PostContainer>
            </Page>
        )
    }
}

Post.getInitialProps = async function (context) {
    if(context.query['dirJsonTree'] && context.query['dirJsonTree'][0])
        return context.query
    else {
        const config = {headers: {'http_x_requested_with': 'axios'}}

        //TODO how to set url and basepath
        const url = 'http://localhost:3000'
        const pathName = context.pathname
        const id = context.query.path
        console.log(`${url}${pathName}${id}`)

        const responseData = axios.get(`${url}${pathName}${id}`, config)
            .then((response) => {return response.data})
            .catch(err => {
                console.error(err)
                return {errorMsg: err}
            })

        return responseData
    }
}

export default Post;