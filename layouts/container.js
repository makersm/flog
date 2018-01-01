import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Grid, Segment} from 'semantic-ui-react'
import {Post, TableOfContents, Indicator} from '../components/index'
import {withExtra} from '../hoc/ExtraViews'

const propTypes = {}

const defaultProps = {}

const InlineStyle = () => (
    <style>{`
        .Grids {
            margin-top: 2rem;
        }
    `}</style>
)

class Container extends Component {

    constructor(props) {
        super(props)
        this.handleContextRef = this.handleContextRef.bind(this)
        this.state = {
            contextRef: {}
        }
    }

    handleContextRef(contextRef) {
        this.setState({
            contextRef
        })
    }

    extraComponent(component, state) {
        // console.log(`component: ${component}`)
        return withExtra(this.props.children.type.name, component, state)
    }

    render() {
        const {contextRef} = this.state
        const {children} = this.props

        return (
            <div ref={this.handleContextRef}>
                <InlineStyle/>
                <Grid columns='equal'>
                    <Grid.Column width={12} className='Grids'>
                        <Segment>
                            {children}
                        </Segment>
                        {this.extraComponent(Indicator, 1)}
                    </Grid.Column>
                    <Grid.Column className='Grids'>
                        {this.extraComponent(TableOfContents ,contextRef)}
                    </Grid.Column>
                </Grid>

            </div>)
    }
}

Container.propTypes = propTypes
Container.defaultProps = defaultProps

export default Container
