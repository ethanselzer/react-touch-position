import React from 'react';
import ReactTouchPosition from '../../../dist/ReactTouchPosition';

import TouchPositionLabel from './TouchPositionLabel';
import OnPositionChangedLabel from './OnPositionChangedLabel';
import InstructionsLabel from './InstructionsLabel';


export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isPositionOutside: true,
            touchPosition: {
                x: 0,
                y: 0,
            }
        }
    }

    render() {
        return (
            <div className="example-container">
                <ReactTouchPosition  {...{
                    className: 'example',
                    onPositionChanged: ({ isPositionOutside, touchPosition }) => {
                        this.setState({
                            isPositionOutside,
                            touchPosition
                        });
                    },
                    shouldDecorateChildren: false
                }}>
                    <TouchPositionLabel />
                    <InstructionsLabel />
                </ReactTouchPosition>
                <OnPositionChangedLabel {...this.state} />
            </div>
        );
    }
}
