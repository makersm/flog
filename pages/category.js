import React, {Component} from 'react';
import Fonts from '../static/Fonts';
import Page from '../layouts/main';
import PostListContainer from '../layouts/container';
import axios from 'axios';
import {PostNameList} from '../components';
import Error from './_error';

const InlineStyle = () => (
    <style>{`
		body {
			background: #E0E0E0;
		}
	`}</style>
);

class Category extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        Fonts();
    }

    render() {
        const {dirJsonTree, postsInfo, statusCode, errorMsg} = this.props;
        if(statusCode >= 400) return <Error statusCode={statusCode} errorMsg={errorMsg}/>;
        return (
            <Page dirJsonTree={dirJsonTree}>
                <InlineStyle/>
                <PostListContainer>
                    <PostNameList postsInfo={postsInfo}/>
                </PostListContainer>
            </Page>
        );
    }
}

function varify(query) {
    return 'dirJsonTree' in query && query['dirJsonTree'][0] && 'postsInfo' in query;
}

Category.getInitialProps = async function (context) {
    if(varify(context.query)) {
        if(context.query.err)
            return {statusCode: context.query.err.code, errorMsg: context.query.err.message};
        return context.query;
    } else {
        const config = {headers: {'http_x_requested_with': 'axios'}};
        const pathName = context.pathname;
        let id = context.query.path;
        if(!id)
            id = '/';

        const responseData = axios.get(`${pathName}${id}`, config)
            .then((response) => {
                return response.data;
            })
            .catch(err => {
                return {statusCode: err.code, errorMsg: err.message};
            });

        return responseData;
    }
};

export default Category;
