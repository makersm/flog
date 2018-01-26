import {CategoryTab, Header} from '../components';
import React from 'react';

export default class main extends React.Component {

    constructor(props) {
        super(props);
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