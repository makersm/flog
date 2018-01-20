import React, {Component} from 'react';
import {Grid, Segment} from 'semantic-ui-react';
import {Post, TableOfContents, Indicator} from '../components/index';
import {withExtra} from '../hoc/ExtraViews';
import $ from 'jquery';

const propTypes = {};

const defaultProps = {};

const InlineStyle = () => (
    <style>{`
        .Grids {
            margin-top: 2rem;
        }
    `}</style>
);

class Container extends Component {

    constructor(props) {
        super(props);
        this.handleContextRef = this.handleContextRef.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
        this.getContentsHeaders = this.getContentsHeaders.bind(this);
        this.state = {
            currentHeaderId: '',
            contentsHeaders: ''
        };
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
        this.setState({
            contentsHeaders: this.getContentsHeaders()
        });
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    getContentsHeaders() {
        let sections = $(':header');
        let headers = [], item = {};
        sections.each(function() {
            if($(this).attr('id')) {
                item['id'] = $(this).attr('id');
                item['name'] = $(this).text();
                headers.push(item);
                item = {};
            }
        });
        return headers;
    }

    handleScroll(event) {
        let scrollTop = event.srcElement.scrollingElement.scrollTop;
        let sections = $(':header');
        let currentSection;
        sections.each(function() {
            let sectionPosition = $(this).offset().top;
            if(sectionPosition - 1 < scrollTop && $(this).attr('id')){
                currentSection = $(this);
            }
        });

        if(currentSection) {
            let id = currentSection.attr('id');
            this.setState({
                currentHeaderId: id
            })
        }
    }

    handleContextRef(contextRef) {
        this.setState({
            contextRef: contextRef
        });
    }

    extraComponent(component, state) {
        return withExtra(this.props.children.type.name, component, state);
    }

    render() {
        const {contextRef, contentsHeaders, currentHeaderId} = this.state;
        const {children} = this.props;

        return (
            <div ref={this.handleContextRef}>
                <InlineStyle/>
                <Grid columns='equal'>
                    <Grid.Column width={12} className='Grids'>
                        <Segment>
                            {children}
                        </Segment>
                        {this.extraComponent(Indicator, {currentPage: 1})}
                    </Grid.Column>
                    <Grid.Column className='Grids'>
                        {this.extraComponent(TableOfContents,
                            {context: contextRef,
                            contentsHeaders: contentsHeaders,
                            currentHeaderId: currentHeaderId})}
                    </Grid.Column>
                </Grid>
            </div>
        );
    }
}

Container.propTypes = propTypes;
Container.defaultProps = defaultProps;

export default Container;
