import React, {Component} from 'react';

const InlineStyle = () => (
    <style>{`
        .ContentsHeader {
            color: gray;
        }
        .ContentsHeader a {
            color: gray;
        }
        .focus a {
            color: black;
        }
    `}</style>
);

const defaultProps = {
    focus: false
};

class ContentsHeader extends Component{
    constructor(props) {
        super(props);
        this.state = {
            className: 'ContentsHeader'
        };
        this.setClassName = this.setClassName.bind(this);
    }

    setClassName(nextProps = this.props){
        if(nextProps.focus) {
            this.setState({
                className: 'focus'
            });
        } else {
            this.setState({
                className: 'ContentsHeader'
            });
        }
    }

    componentDidMount() {
        this.setClassName();
    }

    componentWillReceiveProps(nextProps) {
        this.setClassName(nextProps);
    }

    render() {
        const {className} = this.state;
        const {name, id} = this.props;
        return (
            <div className={className}>
                <InlineStyle/>
                <a href={`#${id}`}>
                    {name}
                </a>
            </div>
        );
    }
}


ContentsHeader.defaultProps = defaultProps
export default ContentsHeader
