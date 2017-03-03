import React from 'react';
import ReactTouchPosition from '../../../dist/ReactTouchPosition';

import TouchPositionLabel from './TouchPositionLabel';
import InstructionsLabel from './InstructionsLabel';

export default class extends React.Component {
    render() {
        const style = {
            height: '350px',
            position: 'relative',
            border: '1px solid #ccc',
            borderRadius: '4px',
            textAlign: 'center'
        };

        return (
            <ReactTouchPosition {...{ style }}>
                <TouchPositionLabel />
                <InstructionsLabel />
            </ReactTouchPosition>
        );
    }
}
