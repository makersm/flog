import React from 'react';
import {Header} from '../components';
import {Icon} from 'semantic-ui-react';

const InlineStyle = () => (
    <style>{`
        .display-center {
            text-align: center;
            font-size: 10rem;
            margin-top: 20rem;
        }
    `}</style>
);

class Error extends React.Component {

    render() {
        const {statusCode, errorMsg} = this.props;
        return (
            <div>
                <InlineStyle/>
                <Header name="MAKER BLOG TEMPLATE"/>
                <div className="display-center">
                    <Icon name="exclamation"/>
                    <h1>{!statusCode ? 'An error occurred on client' :
                            errorMsg ? `${statusCode} : ${errorMsg}` :
                            `An ${statusCode} error occurred on server` }
                    </h1>
                </div>
            </div>
        )
    }
}

Error.getInitialProps = async function ({res, err}) {
    const statusCode = err ? err.code : res ? res.statusCode : null;
    const errorMsg = err ? err.message : null;
    return {statusCode, errorMsg};
};

export default Error;