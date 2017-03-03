import React from 'react';
import ReactTouchPosition from '../../../dist/ReactTouchPosition';

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
