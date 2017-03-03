import React from 'react';
import ReactTouchPosition from 'react-touch-position';

import TouchPositionLabel from './TouchPositionLabel';
import InstructionsLabel from './InstructionsLabel';

export default class extends React.Component {
    render() {
        return (
            <ReactTouchPosition {...{
                className: 'example example--basic'
            }}>
                <TouchPositionLabel />
                <InstructionsLabel />
            </ReactTouchPosition>
        );
    }
}
