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

    makeMessage(statusCode, errorMsg) {
        if(statusCode) {
            if(errorMsg)
                return `${statusCode} : ${errorMsg}`;
            else
                return `An ${statusCode} error occured on server`;
        } else {
            if(errorMsg)
                return `"${errorMsg}" error occured on client`;
            else
                return `An error occured on client`;
        }
    }

    render() {
        const {statusCode, errorMsg} = this.props;
        const message = this.makeMessage(statusCode, errorMsg);
        return (
            <div>
                <InlineStyle/>
                <div className="display-center">
                    <Icon name="exclamation"/>
                    <h1>{message}</h1>
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
