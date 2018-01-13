import React from 'react';
import { connect } from 'react-redux';
import {
    startNewGame,
    changeScore,
    flipCardUp,
    flipCardDown,
    changeCheckingCard,
    confirmCard,
    stopInitialTimer,
    startCheckTimer,
    stopCheckTimer
} from "../../Actions/Actions";
import { PlayField } from './../../../ViewComponents/PlayField/PlayField';
import { EndPage } from "../../../ViewComponents/EndPage/EndPage";
import { Card } from "../../../ViewComponents/PlayField/Card/Card";
import { CardsTypes } from './../../../res/Cards/CardsTypes';

export class PlayFieldContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            checkTimer: null,
            initialTimer: null
        }
    }

    componentDidMount() {
        this.handleStartNewGame();
    }

    handleStartNewGame = () => {
        clearTimeout(this.state.initialTimer);
        clearTimeout(this.state.checkTimer);

        let initialTimer = setTimeout(() => {
            this.props.onStopInitialTimer &&
            this.props.onStopInitialTimer();
        }, 5000);
        this.setState({
            initialTimer
        });

        this.props.onStartNewGame &&
        this.props.onStartNewGame();
    };


    render() {
        if(
            this.props.cards &&
            this.getConfirmedCardsCount() < this.props.cards.length
        )
            return (
                <PlayField
                    onStartNewGame={this.handleStartNewGame}
                    score={this.props.score || 0}
                >
                    {this.props.cards.map((card,index) =>
                        <Card
                            {...card}
                            index={index}
                            onCardClick={this.handleCardClick}
                            key={index}
                            image={CardsTypes[card.type]}
                        />
                    )}
                </PlayField>
            );
        return (
            <EndPage
                score={this.props.score || 0}
                onRestart={this.handleStartNewGame}
            />
            );
    }

    handleCardClick = (cardIndex) => {
        if(!this.props.initialTimerInProgress)
        if(!this.props.checkTimerInProgress) {
            this.props.onFlipCardUp(cardIndex);
            if (this.props.checkingCardIndex < 0) {
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
        this.props.onConfirmPair([cardIndex, this.props.checkingCardIndex]);
        this.addScore();
    }

    handleWrongGuess(cardIndex) {
        let checkTimer = setTimeout(() => {
            this.props.onFlipCardDown(cardIndex);
            this.props.onFlipCardDown(this.props.checkingCardIndex);
            this.props.onStopCheckTimer()
        }, 2000);

        this.reduceScore();

        this.setState({
            checkTimer,
        }, this.props.onStartCheckTimer);
    }



    addScore() {
        this.props.onChangeScore &&
        this.props.cards &&
        this.props.onChangeScore(
            (this.props.cards.length / 2 -
                Math.floor(this.getConfirmedCardsCount() / 2)) * 42
        );
    }

    reduceScore() {
        this.props.onChangeScore &&
        this.props.cards &&
        this.props.onChangeScore(
            (-Math.floor(this.getConfirmedCardsCount() / 2) * 42)
        );
    }

    getConfirmedCardsCount() {
        let cardsConfirmed = 0;
        if(this.props.cards)
            for(let i = 0; i < this.props.cards.length; i++) {
                if(this.props.cards[i].isConfirmed)
                    cardsConfirmed++;
            }
        return cardsConfirmed;
    }

    componentWillUnmount() {
        clearTimeout(this.state.initialTimer);
        clearTimeout(this.state.checkTimer);
    }
}

export const getNewSetOfCards = (size) => {
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

export const mapStateToProps = (state, ownProps) => {
    return {
        cards: state.cards.toJS() || [],
        score: state.score,
        checkingCardIndex: state.checkingCardIndex,
        initialTimerInProgress: state.initialTimerInProgress,
        checkTimerInProgress: state.checkTimerInProgress
    }
};

export const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onStartNewGame: () => {
            dispatch(startNewGame(getNewSetOfCards(ownProps.size || 9)));
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
        onConfirmPair: (cards) => {
            dispatch(confirmCard(cards));
        },
        onStopInitialTimer: () => {
            dispatch(stopInitialTimer());
        },
        onStartCheckTimer: (wrongCardIndex) => {
            dispatch(startCheckTimer(wrongCardIndex));
        },
        onStopCheckTimer: () => {
            dispatch(stopCheckTimer());
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PlayFieldContainer);