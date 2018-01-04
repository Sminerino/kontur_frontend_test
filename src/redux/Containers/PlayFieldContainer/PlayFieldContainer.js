import React from 'react';
import { connect } from 'react-redux';
import {
    setCards,
    changeScore,
    flipCardUp,
    flipCardDown,
    changeCheckingCard,
    confirmCard
} from "../../Actions/Actions";
import { PlayField } from './../../../ViewComponents/PlayField/PlayField';
import { Card } from "../../../ViewComponents/PlayField/Card/Card";
import { CardsTypes } from './../../../res/Cards/CardsTypes';

const imgPath = require.context('./../../../res/CardsImages');


class PlayFieldContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            checkTimeout: false
        }
    }

    render() {
        return(
            <PlayField
                onStartNewGame={this.handleStartNewGame}
                score={this.props.score}
            >
                {this.props.cards.map((card,index) =>
                    <Card
                        {...card}
                        onCardFlip={this.handleCardFlip}
                        key={index}

                    />
                )}
            </PlayField>
        )
    }

    handleCardFlip = (cardIndex) => {
        if(!this.state.checkTimeout) {
            this.props.onFlipCardUp(cardIndex);
            if (!this.props.checkingCardIndex) {
                this.props.onChangeCheckingCard(cardIndex);
            } else {
                if (
                    this.props.cards[cardIndex].type
                    ===
                    this.props.cards[this.props.checkingCardIndex].type
                )
                    this.handleRightGuess(cardIndex);
                else this.handleWrongGuess(cardIndex);
            }
        }
    };

    handleRightGuess(cardIndex) {
        this.addScore();
        this.props.onConfirmCard(cardIndex);
        this.props.onConfirmCard(this.props.checkingCardIndex);
        this.props.onChangeCheckingCard(NaN);
    }

    handleWrongGuess(cardIndex) {
        this.reduceScore();
        this.props.onChangeCheckingCard(NaN);
        this.setState({
            checkTimeout: true
        },() => {
            setTimeout(() => {
                this.props.onFlipCardDown(cardIndex);
                this.props.onFlipCardDown(this.props.checkingCardIndex);
            }, 3000);

            this.setState({
                checkTimeout: false
            })
        });
    }

    handleStartNewGame = (size) => {
        this.props.onStartNewGame(size)
    };

    addScore() {
        this.props.onChangeScore(
            (this.props.cards.length / 2 - this.getOpenPairsCount()) * 42
        );
    }
    reduceScore() {
        this.props.onChangeScore(
            (this.getOpenPairsCount() * 42)
        );
    }
    getOpenPairsCount() {
        let cardsOpen = 0;
        for(let i = 0; i < this.props.cards.length; i++) {
            if(this.props.cards[i].isFlippedUp)
                cardsOpen++;
        }
        return cardsOpen / 2;
    }

}

const getNewSetOfCards = (size) => {
    let cards = [];

    while(cards.length < size) {
        let generated = Math.round(Math.random()*51);
        if(cards.indexOf(generated) > -1) continue;
        cards.push(generated);
    }

    cards = cards.concat(cards);
    let l = cards.length, rand, buf;

    while(l) {
        rand = Math.floor(Math.random() * l--);
        buf = cards[l];
        cards[l] = cards[rand];
        cards[rand] = buf;
    }

    return cards;
};

const mapStateToProps = (state, ownProps) => {
    return {
        cards: state.cards.toJS(),
        score: state.score,
        checkingCardIndex: state.checkingCardIndex
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onStartNewGame: (size) => {
            dispatch(setCards(getNewSetOfCards(size)));
        },
        onChangeScore: (delta) => {
            dispatch(changeScore(delta));
        },
        onFlipCardUp: (cardIndex) => {
            dispatch(flipCardUp(cardIndex));
        },
        onFlipCardDown: (cardIndex) => {
            dispatch(flipCardDown(cardIndex));
        },
        onChangeCheckingCard: (cardIndex) => {
            dispatch(changeCheckingCard(cardIndex));
        },
        onConfirmCard: (cardIndex) => {
            dispatch(confirmCard(cardIndex));
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PlayFieldContainer);