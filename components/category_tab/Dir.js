import React, {Component} from 'react';
import Link from 'next/link';

const InlineStyle = () => (
    <style>{`
        li {
            font-size: 1.2rem;
            margin: 5px;
            clear: both;
            cursor: pointer;
			color: #1185cf;
        }
		.dir {
			color: lightgray;
		}
		.count {
			color: gray;
		}
		.dropdown {
		    float: right;
		}
	`}</style>
);

class Dir extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {name, count, id} = this.props;
        return (
            <div>
                <InlineStyle/>
                <Link href={{pathname: '/category', query: {path: id}}} as={`/category${id}`}>
                    <li>
                        <a className="dir">
                            {name} <span className="count">[{count}]</span>
                        </a>
                    </li>
                </Link>
            </div>
        );
    }
}

export default Dir;
