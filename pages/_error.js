import React from 'react'
import {Header} from '../components'
import Fonts from '../static/Fonts'
import {Icon} from 'semantic-ui-react'

const InlineStyle = () => (
    <style>{`
        .display-center {
            text-align: center;
            font-size: 10rem;
            margin-top: 20rem;
        }
    `}</style>
)

class Error extends React.Component {
    static getInitialProps({res, err}) {
        const statusCode = res ? res.statusCode : err ? err.statusCode : null;
        return {statusCode}
    }

    componentDidMount() {
        Fonts()
    }

    render() {
        return (
            <div>
                <InlineStyle/>
                <Header name="MAKER BLOG TEMPLATE"/>
                <div className="display-center">
                    <Icon name="exclamation"/>
                    <h1>
                        {this.props.statusCode
                            ? `An error ${this.props.statusCode} occurred on server. please try again later.`
                            : 'An error occurred on client'}
                    </h1>
                </div>
            </div>
        )
    }
}

export default Error