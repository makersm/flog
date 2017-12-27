import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Grid, Segment} from 'semantic-ui-react'
import {Category, Post, TableOfContents} from '../components/index'

const propTypes = {}

const defaultProps = {}

const InlineStyle = () => (
    <style>{`
        .Grids {
            margin-top: 2rem;
        }
    `}</style>
)
class WrapContainer extends Component {

    constructor(props) {
        super(props)
    }

    state = {}
    handleContextRef = contextRef => this.setState({ contextRef })

    render() {
        const {contextRef} = this.state

        return (
            <div className='WrapContainer' ref={this.handleContextRef}>
                <InlineStyle/>
                <Grid columns='equal'>
                    <Grid.Column width={12} className='Grids'>
                        <Segment>
                            <Post/>
                        </Segment>
                    </Grid.Column>
                    <Grid.Column className='Grids'>
                        <TableOfContents context={contextRef}/>
                    </Grid.Column>
                </Grid>

            </div>)
    }
}

WrapContainer.propTypes = propTypes
WrapContainer.defaultProps = defaultProps

export default WrapContainer
