import React, {Component} from 'react';
import Fonts from '../static/Fonts'
import Page from '../layouts/main'
import PostListContainer from '../layouts/container'
import axios from 'axios'
import {PostNameList} from '../components'
import Error from './_error'

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
    }

    componentDidMount() {
        Fonts()
    }

    render() {
        const {dirJsonTree, postsInfo, errorMsg} = this.props
        if(errorMsg) return <Error errorMsg={errorMsg}/>
        return (
            <Page dirJsonTree={dirJsonTree}>
                <InlineStyle/>
                <PostListContainer>
                    <PostNameList postsInfo={postsInfo}/>
                </PostListContainer>
            </Page>
        )
    }
}

Category.getInitialProps = async function (context) {
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

export default Category;
