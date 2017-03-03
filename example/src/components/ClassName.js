import React from 'react';
import ReactTouchPosition from '../../../dist/ReactTouchPosition';

import TouchPositionLabel from './TouchPositionLabel';
import InstructionsLabel from './InstructionsLabel';

export default () => (
    <ReactTouchPosition className="example">
        <TouchPositionLabel />
        <InstructionsLabel />
    </ReactTouchPosition>
);

