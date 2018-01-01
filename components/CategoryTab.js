import React from 'react'
import {SearchBar, ItemList, SubHeader} from './index'

const InlineStyle = () => (
    <style>{`
		.Category {
            float: left;
            width: 30rem;
            display: inline-block;
            padding:3rem 1rem 0 1rem;
            background-color: #b3b3cc;
            height: 100vh;
		}
	`}</style>
)

const CategoryTab = (props) => {
    const {dirJsonTree, dirPath, url} = props

    return (
        <div className='Category'>
            <InlineStyle/>
            <SubHeader name='Category' style={{color: 'white'}}/>
                <SearchBar/>
            <ItemList dirJsonTree={dirJsonTree} dirPath={dirPath} url={url}/>
        </div>
    )
}

export default CategoryTab
