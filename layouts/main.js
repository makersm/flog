import {Header, CategoryTab} from '../components';

export default (props) => {
    const {dirJsonTree, children} = props;
    return (
        <div>
            <Header name="MAKER BLOG TEMPLATE"/>
            <CategoryTab dirJsonTree={dirJsonTree}/>
            {children}
        </div>
    );
}