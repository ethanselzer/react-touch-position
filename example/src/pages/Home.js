import React, { Component } from 'react';
import Helmet from 'react-helmet';

import Header from '../components/Header';
import BasicExample from '../components/BasicExample';

import 'bootstrap/dist/css/bootstrap.css';
import '../../styles/app.css';

import {
    Clearfix,
    Col,
    Grid,
    Jumbotron,
    Nav,
    NavItem,
    Panel,
    Row
} from 'react-bootstrap';

class App extends Component {
    render() {
        return (
            <div>
                <Helmet title="Examples | React Touch Position" />
                <Header {...this.props} />
                <Jumbotron>
                    <Grid>
                        <h1>Examples</h1>
                        <p className="summary">
                            React Touch Position is a primitive component for composing UI features that
                            require notification of touch position status.<br />

                            It plots touch coordinates relative to itself and re-renders child components with new touch
                            position props when touch position changes.<br />

                            React Touch Position Supports the&nbsp;
                            <a href="https://material.google.com/patterns/gestures.html">
                                Long-press
                            </a>
                            &nbsp;gesture and does not interfere with page or element scrolling.<br />

                            It is safe for server rendering and cleans up after unmount on the client.<br />
                        </p>
                    </Grid>
                </Jumbotron>
                <Grid>
                    <Row>
                        <Col xs={12} sm={6} md={4} lg={3}>
                            <Panel header="Basic Example" bsStyle="primary" style={{ height: '281px' }}>
                                <BasicExample />
                            </Panel>
                        </Col>
                        <Col xs={12} sm={6} md={4} lg={3}>
                            <Panel header="Props API Examples" bsStyle="primary">
                                <Nav bsStyle="pills" stacked>
                                    <NavItem eventKey={2.1} href="#/map-child-props">mapChildProps</NavItem>
                                    <NavItem eventKey={2.2} href="#/on-position-changed">onPositionChanged</NavItem>
                                    <NavItem eventKey={2.3} href="#/should-decorate-children">shouldDecorateChildren</NavItem>
                                    <NavItem eventKey={2.4} href="#/class-name">className</NavItem>
                                    <NavItem eventKey={2.5} href="#/style">style</NavItem>
                                </Nav>
                            </Panel>
                        </Col>
                        <Clearfix visibleSmBlock />
                        <Col xs={12} sm={6} md={4} lg={3}>
                            <Panel header="Use Case" bsStyle="primary" style={{ height: '281px' }}>
                                <Nav bsStyle="pills" stacked>
                                    <NavItem href="#/image-magnify">
                                        React Image Magnify
                                    </NavItem>
                                </Nav>
                            </Panel>
                        </Col>
                        <Col xs={12} sm={6} md={4} lg={3}>
                            <Panel header="Playground" bsStyle="primary" style={{ height: '281px' }}>
                                <Nav bsStyle="pills" stacked>
                                    <NavItem href="http://codepen.io/ethanselzer/pen/KWzOgj">
                                        React Touch Position Live Edit
                                    </NavItem>
                                </Nav>
                            </Panel>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default App;
