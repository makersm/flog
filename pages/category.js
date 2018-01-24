import React, {Component} from 'react';
import Page from '../layouts/main';
import PostListContainer from '../layouts/container';
import axios from 'axios';
import {PostNameList} from '../components';
import Error from './_error';
import Router from 'next/router';

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
        console.log('constructor');
    }

    // TODO make tmp log
    // componentDidMount() {
    //     console.log('didMount');
    //     if(this.props['clientSide-rendering']) {
    //         console.log('wefe');
    //     }
    // }
    //
    // componentWillMount() {
    //     console.log('willmount');
    // }
    //
    // componentWillUnmount() {
    //     console.log('willUnmount');
    //     if(this.props['clientSide-rendering']) {
    //         // Router.replace(this.props['href']);
    //         console.log('hellworold');
    //     }
    // }
    //
    // componentWillReceiveProps(nextProps){
    //     console.log("componentWillReceiveProps: " + JSON.stringify(nextProps));
    //     if(this.props['clientSide-rendering']) {
    //     }
    // }
    //
    //
    // componentDidUpdate(prevProps, prevState){
    //     console.log("componentDidUpdate: " + JSON.stringify(prevProps) + " " + JSON.stringify(prevState));
    //     if(this.props['clientSide-rendering']) {
    //         console.log('wefe');
    //     }
    // }

    render() {
        const {dirJsonTree, postsInfo, statusCode, errorMsg} = this.props;
        if (statusCode >= 400 || errorMsg) return <Error statusCode={statusCode} errorMsg={errorMsg}/>;
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

function verify(query) {
    return 'dirJsonTree' in query && query['dirJsonTree'][0] && 'postsInfo' in query;
}

Category.getInitialProps = async function (context) {
    console.log('getInitialProps');
    console.log(context);
    if (verify(context.query)) {
        if (context.query.err)
            return {statusCode: context.query.err.code, errorMsg: context.query.err.message};
        return context.query;
    } else {
        const config = {headers: {'http-x-requested-with': 'axios'}};
        const pathName = context.pathname;
        let id = context.query.path;
        if (!id)
            id = '/';

        const responseData = await axios.get(`${pathName}${id}`, config)
            .then((response) => {
                // return Object.assign(response.data, {'clientSide-rendering': true, 'href': `${pathName}${id}`});
                return response.data;
            })
            .catch(err => {
                return {statusCode: err.code, errorMsg: err.message};
            });

        return responseData;
    }
};

export default Category;
