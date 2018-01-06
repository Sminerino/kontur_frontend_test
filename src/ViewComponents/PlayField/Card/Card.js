import React from 'react';

const Card = (props) =>
    <div onClick={()=>props.onCardClick(props.index)}>
        {props.type}__{props.isFlippedUp?'up':'down'}__{props.isConfirmed?'conf':'nc'}
        {props.image}
    </div>;

export { Card };