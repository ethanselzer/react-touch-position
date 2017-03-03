import React from 'react';
import ReactTouchPosition from '../../../dist/ReactTouchPosition';

import TouchPositionLabel from './OnPositionChangedLabel';
import InstructionsLabel from './InstructionsLabel';

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            touchPosition: {
                x: 0,
                y: 0,
            },
            isPositionOutside: true
        };
    }

    render() {
        return (
            <div className="example-container">
                <ReactTouchPosition  {...{
                    className: 'example',
                    onPositionChanged: ({ isPositionOutside, touchPosition }) => {
                        this.setState({
                            touchPosition,
                            isPositionOutside
                        });
                    }
                }}>
                    <InstructionsLabel />
                </ReactTouchPosition>
                <TouchPositionLabel {...this.state} />
            </div>
        );
    }
}
