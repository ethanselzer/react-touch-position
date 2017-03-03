import React from 'react';

export default (props) => {
    const {
        touchPosition: {
            x = 0,
            y = 0,
        } = {},
        isPositionOutside = true
    } = props;

    return (
        <div>
            {`x: ${x}`}<br />
            {`y: ${y}`}<br />
            {`isPositionOutside: ${isPositionOutside ? 'true' : 'false'}`}<br />
        </div>
    );
}
