import {TableOfContents, Indicator} from '../components'

export const withExtra = (childrenType, MatchComponent, propData) => {
    const componentPair = {
        'Post': TableOfContents,
        'PostNameList': Indicator
    }

    if(componentPair[childrenType] !== MatchComponent) {
        return <div/>
    }

    let props = {context: propData}

    return <MatchComponent {...props}/>
}