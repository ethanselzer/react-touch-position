import React from 'react';

export default (props) => {
    const {
        point: {
            x = 0,
            y = 0
        } = {},
        isActive = false,
        isOutside = true
    } = props;

    return (
        <div>
            {`x: ${x}`}<br />
            {`y: ${y}`}<br />
            {`isActive: ${isActive}`}<br />
            {`isOutside: ${isOutside ? 'true' : 'false'}`}<br />
        </div>
    );
}
