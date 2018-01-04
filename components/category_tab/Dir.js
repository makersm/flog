import React, {Component} from 'react'
import Link from 'next/link'

const InlineStyle = () => (
    <style>{`
        li {
            font-size: 1.2rem;
            margin: 5px;
            clear: both;
            cursor: pointer;
        }
		.count {
			color: gray;
		}
		.dropdown {
		    float: right;
		}
	`}</style>
)

class Dir extends Component {

    constructor(props) {
        super(props)
        this.spread = this.spread.bind(this)
    }

    spread(id, e) {
        console.log(id)

    }

    render()
    {
        const {name, count, id} = this.props
        return (
            <div>
                <InlineStyle/>
                <Link href={{ pathname: '/category', query: { path: id }}} as={`/category${id}`}>
                <li onClick={ e => this.spread(id, e)}>
                    <a>
                        {name} <span className="count">[{count}]</span>
                    </a>
                </li>
                </Link>
            </div>
        )
    }
}

export default Dir
