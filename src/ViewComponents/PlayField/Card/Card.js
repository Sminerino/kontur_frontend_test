import React from 'react';

const Card = (props) =>
    <div>
        {props.type}__{props.isFlippedUp}
    </div>;

export { Card };