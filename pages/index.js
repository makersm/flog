import React, {Component} from 'react';
import Page from '../layouts/main'
import {PostView} from '../components'
import PostContainer from '../layouts/container'
import axios from 'axios'
import Error from './_error'

const InlineStyle = () => (
    <style>{`
		body {
			font-family: 'Open Sans, sans-serif';
		}
	`}</style>
);

class Index extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {dirJsonTree, postInfo, statusCode, errorMsg} = this.props;
        if (statusCode >= 400 || errorMsg) return <Error statusCode={statusCode} errorMsg={errorMsg}/>;
        return (
            <Page dirJsonTree={dirJsonTree}>
                <InlineStyle/>
                <PostContainer>
                    <PostView postInfo={postInfo}/>
                </PostContainer>
            </Page>
        );
    }
}

function verify(query) {
    return 'dirJsonTree' in query && query['dirJsonTree'][0] && 'postInfo' in query;
}

Index.getInitialProps = async function (context) {
    if (verify(context.query)) {
        if (context.query.err)
            return {statusCode: context.query.err.code, errorMsg: context.query.err.message};
        return context.query;
    } else {
        const responseData = await axios.post('')
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
