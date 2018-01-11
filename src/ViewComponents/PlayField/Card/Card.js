import React from 'react';

class Card extends React.PureComponent {

    onThisCardClick = () => {
        this.props.onCardClick(this.props.index);
    };

    render() {
        if (!this.props.isFlippedUp)
            return (
                <div
                    className='card card_down'
                    onClick={this.onThisCardClick}
                    data-tid='Card'
                >
                    <img
                        src={require('./../../../res/Cards/cardback.png')}
                        className='card__image'
                        alt='Card back'
                    />
                </div>
            );
        if (!this.props.isConfirmed)
            return (
                <div className='card card_up' data-tid='Card-flipped'>
                    <img
                        src={this.props.image}
                        className='card__image'
                        alt='Card'
                    />
                </div>
            );
        return (
            <div className='card card_confirmed'>
                <img
                    src={this.props.image}
                    className='card__image'
                    alt='Card'
                />
            </div>
        );
    }
}

export { Card };