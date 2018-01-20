import React, {Component} from 'react';
import {ContentsHeader} from '../../components';

const InlineStyle = () => (
    <style>{`
        hr {
            border-top: 1px dotted #8c8b8b;
            border-bottom: 1px dotted #fff;
        }
        h1 {
            font-size: 1.5rem;
        }
        h2 {
            font-size: 1.4rem;
        }
        h3 {
            font-size: 1.3rem;
        }
        h4 {
            font-size: 1.2rem;
        }
        h5 {
            font-size: 1.1rem;
        }
        h6 {
            font-size: 1rem;
            margin: 0;
        }
    `}</style>
);

class ContentsHeaderList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {currentHeaderId, contentsHeaders} = this.props;
        let match = contentsHeaders ? contentsHeaders.map((contentsHeader) => {
                if(contentsHeader.id === currentHeaderId) {
                    return <ContentsHeader name={contentsHeader.name} key={contentsHeader.id} id={contentsHeader.id}
                                           focus={true}/>
                }
                return <ContentsHeader name={contentsHeader.name} key={contentsHeader.id} id={contentsHeader.id}/>
            }) : currentHeaderId;
        return (
            <div className='ContentsHeaderList'>
                <InlineStyle/>
                {match}
            </div>
        )
    }
}

export default ContentsHeaderList;
