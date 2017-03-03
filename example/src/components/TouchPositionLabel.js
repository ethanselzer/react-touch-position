import React from 'react';

export default (props) => {
    const {
        touchPosition: {
            x = 0,
            y = 0,
        } = {},
        isPositionOutside = true,
        isActive = false
    } = props;

    return (
        <div>
            {`x: ${x}`}<br />
            {`y: ${y}`}<br />
            {`isActive: ${isActive}`}<br />
            {`isPositionOutside: ${isPositionOutside ? 'true' : 'false'}`}<br />
        </div>
    );
}
