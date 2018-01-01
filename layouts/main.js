import {Header, CategoryTab} from '../components'

export default (props) => {
    const {dirJsonTree, dirPath, children} = props
    return (
    <div>
        <Header name="MAKER BLOG TEMPLATE"/>
        <CategoryTab dirJsonTree={dirJsonTree} dirPath={dirPath}/>
        {children}
    </div>
    )
}