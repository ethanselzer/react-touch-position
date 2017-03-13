import React, { Component } from 'react';
import {
  Col,
  Grid,
  Jumbotron,
  Row
} from 'react-bootstrap';
import Helmet from 'react-helmet';
import { ReactImageMagnifyTouch } from 'react-image-magnify';

import Header from '../components/Header';

import watchImg from '../../images/large-a.jpg';

import 'bootstrap/dist/css/bootstrap.css';
import '../../styles/app.css';

class  ImageMagnify extends Component {
    render() {
        return (
            <div>
                <Helmet title="Image Magnify Use Case | React Touch Position" />
                <Header {...this.props}/>
                <Jumbotron>
                    <Grid>
                        <Row>
                            <Col sm={12}>
                                <h2>React Image Magnify - Use Case</h2>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={5}>
                                <ul className="summary__list">
                                    <li>
                                        The React Image Magnify package depends on React Touch Position
                                        for touch coordinates
                                    </li>
                                    <li>
                                       Press (long touch) image to magnify. Pan (drag) to traverse image.
                                    </li>
                                    <li>
                                        Note the page can be scrolled when touch begins on image.
                                    </li>
                                </ul>
                            </Col>
                            <Col sm={5}>
                                <ul className="summary__list">
                                    <li>
                                        <a href="https://github.com/ethanselzer/react-image-magnify">
                                            React Image Magnify project
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://github.com/ethanselzer/react-image-magnify/blob/master/src/ReactImageMagnifyTouch.js#L29">
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
                        <Col sm={12}>
                            <ReactImageMagnifyTouch {...{
                                style: {margin: '0 auto'},
                                largeImage: {
                                    alt: 'Enlarged product image',
                                    src: watchImg,
                                    width: 1200,
                                    height: 1800
                                },
                                smallImage: {
                                    alt: 'Product image',
                                    src: watchImg,
                                    width: 300,
                                    height: 450
                                }
                            }} />
                            <div style={{height: '1000px', display: 'flex', alignItems: 'flex-end'}}>
                                <div style={{margin: '0 auto'}}>Scroll Spacer</div>
                            </div>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default ImageMagnify;
