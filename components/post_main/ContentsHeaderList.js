import React, {Component} from 'react'
import {ContentsHeader} from '../../components'

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
)

const defaultProps = {
}


class ContentsHeaderList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            contentsHeaders: []
        }

        this.divideContentsByHeader = this.divideContentsByHeader.bind(this)
    }

    divideContentsByHeader(contents) {
        let findHeader = new RegExp(/<h[1-6] id="[^"]*">.*<\/h[1-6]>/g)
        let unnecessaryAtag = new RegExp(/<a href="[^"]*">/)
        let match, matchesList = []
        while((match = findHeader.exec(contents)) !== null){
            let matches = {}
            let matchString = ''
            if(unnecessaryAtag.test(match)){
                let matchSplit = match[0].split(/<a href="[^"]*">/)
                matchString = matchSplit.reduce((a, b) => {
                    return a + b
                })
                matchSplit = matchString.split(/<\/a>/)
                matchString = matchSplit.reduce((a, b) => {
                    return a + b
                })
            } else
                matchString = match[0]

            let href = matchString.split(/<h[1-6] id="[^"]*"><a class="[^"]*" href="/)

            matches.name = matchString
            matches.href = href[0]

            matchesList.push(matches)
        }
        this.setState({
            contentsHeaders: matchesList
        })
        console.log(this.state.contentsHeaders)
    }

    componentDidMount() {
        this.divideContentsByHeader(this.props.contents)
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps !== this.props)
            this.divideContentsByHeader(nextProps.contents)
    }

    render() {
        // const {contents} = this.props
        const {contentsHeaders} = this.state
        console.log(contentsHeaders)
        return (
            <div className='ContentsHeaderList'>
                <InlineStyle/>
                {contentsHeaders.map((contentsHeader) => {
                    return <ContentsHeader name={contentsHeader.name} key={contentsHeader.name} id={contentsHeader.name}/>
                })}
            </div>
        )
    }
};

ContentsHeaderList.defaultProps = defaultProps
export default ContentsHeaderList
