import React, { Component } from 'react';
import {
  Col,
  Grid,
  Jumbotron,
  Row
} from 'react-bootstrap';
import Helmet from 'react-helmet';

import OnPositionChanged from '../components/OnPositionChanged';
import Header from '../components/Header';

import 'bootstrap/dist/css/bootstrap.css';
import '../../styles/app.css';

class  OnPositionChangedPage extends Component {
    render() {
        return (
            <div>
                <Helmet title="On Position Changed | React Touch Position" />
                <Header {...this.props}/>
                <Jumbotron>
                    <Grid>
                        <Row>
                            <Col sm={12}>
                                <h2>On Position Changed - API Example</h2>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={5}>
                                <ul className="summary__list">
                                    <li>
                                        Implement onPositionChanged when a parent component or global
                                        store should be notified of cursor position changes
                                    </li>
                                </ul>
                            </Col>
                            <Col sm={5}>
                                <ul className="summary__list">
                                    <li>Type: Function</li>
                                    <li>
                                        <a href="https://github.com/ethanselzer/react-touch-position/blob/master/example/src/components/OnPositionChanged.js">
                                            Example Code
                                        </a>
                                    </li>
                                </ul>
                            </Col>
                        </Row>
                    </Grid>
                </Jumbotron>
                <Grid>
                    <Row>
                        <Col sm={6} md={4} lg={4}>
                            <OnPositionChanged/>
                        </Col>
                        <Col sm={6} md={8} lg={8}>
                            <a
                                style={{display: 'block', height: '650px'}}
                                className="highlighter"
                                href="https://github.com/ethanselzer/react-touch-position/blob/master/example/src/components/OnPositionChanged.js"
                            >
                                <iframe
                                    src="on-position-changed.html"
                                    frameBorder="0"
                                    className="code-frame"
                                />
                            </a>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default OnPositionChangedPage;
