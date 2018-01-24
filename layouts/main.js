import {Header, CategoryTab} from '../components';
import React from 'react';
import Router from "next/router";

export default class main extends React.Component {

    constructor(props) {
        super(props);
        Router.onRouteChangeStart = url => {
            console.log('App is changing to: ', url)
        };

        Router.onRouteChangeComplete = url => {
            console.log('ChangeComplete: ', url)
        };
    }

    render() {
        const {dirJsonTree, children} = this.props;

        return (
            <div>
                <Header name="MAKER BLOG TEMPLATE"/>
                <CategoryTab dirJsonTree={dirJsonTree}/>
                {children}
            </div>
        );
    }
}