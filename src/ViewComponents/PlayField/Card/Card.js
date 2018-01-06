import React from 'react';

const Card = (props) => {
    if(!props.isFlippedUp)
        return (
            <div className='card card_down' onClick={()=>props.onCardClick(props.index)}>
                <img src={require('./../../../res/Cards/cardback.png')}/>
            </div>
        );
    if(!props.isConfirmed)
        return (
            <div className='card card_up'>
                {props.image}
            </div>
        );
    return <div className='card card_up card_confirmed' />
};
export { Card };