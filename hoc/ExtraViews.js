import {TableOfContents, Indicator} from '../components';

export const withExtra = (childrenType, MatchComponent, props) => {
    const componentPair = {
        'PostView': TableOfContents,
        'PostNameList': Indicator
    };

    if(componentPair[childrenType] !== MatchComponent) {
        return <div/>;
    }

    return <MatchComponent {...props}/>;
};