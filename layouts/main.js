import {Header, Category} from '../components'

export default (props) => {
    const {dirJsonTree, dirPath, url, children} = props
    return (
    <div>
        <Header name="MAKER BLOG TEMPLATE"/>
        <Category dirJsonTree={dirJsonTree} dirPath={dirPath} url={url}/>
        {children}
    </div>
    )
}