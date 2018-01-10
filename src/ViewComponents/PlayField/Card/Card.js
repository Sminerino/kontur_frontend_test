import React from 'react';

const Card = (props) => {
    if(!props.isFlippedUp)
        return (
            <div
                className='card card_down'
                onClick={()=>props.onCardClick(props.index)}
                data-tid='Card'
            >
                <img
                    src={require('./../../../res/Cards/cardback.png')}
                    className='card__image'
                    alt='Card back'
                />
            </div>
        );
    if(!props.isConfirmed)
        return (
            <div className='card card_up' data-tid='Card-flipped'>
                <img
                    src={props.image}
                    className='card__image'
                    alt='Card'
                />
            </div>
        );
    return (
        <div className='card card_confirmed'>
            <img
                src={props.image}
                className='card__image'
                alt='Card'
            />
        </div>
    );
};
export { Card };