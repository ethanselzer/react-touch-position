import React from 'react';
// import ReactTouchPosition from 'react-touch-position';
import ReactTouchPosition from '../../../dist/ReactTouchPosition';

import PointPositionLabel from './PointPositionLabel';
import InstructionsLabel from './InstructionsLabel';

export default class extends React.Component {
    render() {
        return (
            <ReactTouchPosition  {...{
                className: 'example',
                mapChildProps: props => {
                    const {
                        isActive,
                        isPositionOutside,
                        touchPosition
                    } = props;

                    return {
                        isActive,
                        isOutside: isPositionOutside,
                        point: touchPosition
                    };
                }
            }}>
                <PointPositionLabel />
                <InstructionsLabel />
            </ReactTouchPosition>
        );
    }
}
