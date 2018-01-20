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
);

class Index extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        Fonts();
    }

    render() {
        const {dirJsonTree, postInfo, statusCode, errorMsg} = this.props;
        if(statusCode >= 400) return <Error statusCode={statusCode} errorMsg={errorMsg}/>;
        return (
            <Page dirJsonTree={dirJsonTree}>
                <InlineStyle/>
                <PostContainer>
                    <PostView postInfo={postInfo}/>
                </PostContainer>
            </Page>
        )
    }
}

function varify(query) {
    return 'dirJsonTree' in query && query['dirJsonTree'][0] && 'postInfo' in query;
}

Index.getInitialProps = async function(context) {
    if(varify(context.query)) {
        if(context.query.err)
            return {statusCode: context.query.err.code, errorMsg: context.query.err.message};
        return context.query;
    } else {
        const config = {headers: {'http_x_requested_with': 'axios'}};

        const responseData = axios.get('', config)
            .then((response) => {
                return response.data;
            })
            .catch(err => {
                return {statusCode: err.code, errorMsg: err.message};
            });

        return responseData;
    }
}

export default Index;
