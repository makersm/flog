import React, {Component} from 'react'
import {Icon} from 'semantic-ui-react'

class AccodionIcon extends Component {
    constructor(props) {
        super(props)
    }

    componentWillReceiveProps() {
        if(this.props.isActive) {
            this.closeIcon.style={display: 'none'}
            this.openIcon.style={display: 'visible'}
        } else {
            this.closeIcon.style={display: 'visible'}
            this.openIcon.style={display: 'none'}
        }
    }

    render() {
        return (
            <div className="AccodionIcon">
                <Icon name='triangle left' ref={(close) => {
                    this.closeIcon = close
                }}/>
                <Icon name='dropdown' style={{display: 'none'}} ref={(open) => {
                    this.openIcon = open
                }}/>
            </div>
        )
    }
}

export default AccodionIcon
