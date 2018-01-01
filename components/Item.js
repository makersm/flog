import React, {Component} from 'react'
import Link from 'next/link'

const InlineStyle = () => (
    <style>{`
        li {
            font-size: 1.2rem;
            margin: 5px;
            clear: both;
        }
		.count {
			color: gray;
		}
		.dropdown {
		    float: right;
		}
	`}</style>
)

class Item extends Component {

    constructor(props) {
        super(props)
        this.spread = this.spread.bind(this)
    }

    spread(id, e) {
        console.log(id)

    }

    render()
    {
        const {name, count, id, children} = this.props
        return (
            <div>
                <InlineStyle/>
                <Link prefetch href={{ pathname: '/category', query: { path: id }}} as={`/category`}>
                <li onClick={ e => this.spread(id, e)}>
                    {name} <span className="count">[{count}]</span>
                    <span className="dropdown">{children}</span>
                </li>
                </Link>
            </div>
        )
    }
}

export default Item
