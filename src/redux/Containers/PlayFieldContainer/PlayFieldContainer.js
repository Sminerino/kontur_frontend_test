import React from 'react';
import { connect } from 'react-redux';
import {setCards, changeScore, flipCardUp, flipCardDown, changeCheckingCard} from "../../Actions/Actions";
//import { PlayField } from ...
//import { Card } from ...

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
            >
                {this.props.cards.map(card =>
                    <Card
                        {...card}
                        onCardFlip={this.handleCardFlip}
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
                    this.handleRightGuess();
                else this.handleWrongGuess(cardIndex);
            }
        }
    };

    handleRightGuess() {
        this.addScore();
        this.props.onChangeCheckingCard(NaN);
    }

    handleWrongGuess(cardIndex) {
        this.reduceScore();
        this.props.onChangeCheckingCard(NaN);
        this.reduceScore();
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

    handleStartNewGame = () => {
        this.props.onStartNewGame() //yet to make custom size
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
        onStartNewGame: () => {
            dispatch(setCards(getNewSetOfCards(ownProps.size)));
        },
        onChangeScore: (delta) => {
            dispatch(changeScore(delta))
        },
        onFlipCardUp: (cardIndex) => {
            dispatch(flipCardUp(cardIndex))
        },
        onFlipCardDown: (cardIndex) => {
            dispatch(flipCardDown(cardIndex))
        },
        onChangeCheckingCard: (cardIndex) => {
            dispatch(changeCheckingCard(cardIndex))
        }

    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PlayFieldContainer);