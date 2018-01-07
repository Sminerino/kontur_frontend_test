import React from 'react';
import { connect } from 'react-redux';
import {
    setCards,
    changeScore,
    flipCardUp,
    flipCardDown,
    flipAllDown,
    changeCheckingCard,
    confirmCard
} from "../../Actions/Actions";
import { PlayField } from './../../../ViewComponents/PlayField/PlayField';
import { Card } from "../../../ViewComponents/PlayField/Card/Card";
import { CardsTypes } from './../../../res/Cards/CardsTypes';

const imagesReq = require.context('./../../../res/Cards', false);


class PlayFieldContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            gameLoading: true, //mounting
            initialTimerInProgress: true, //5 seconds of flipped up cards time
            checkTimerInProgress: false, //2 seconds to look at wrongly guessed cards

            checkTimer: null,
            initialTimer: null
        }
    }

    componentDidMount() {
        this.setState({
            gameLoading: false,
        }, this.handleStartNewGame);
    }

    handleStartNewGame = () => {
        clearTimeout(this.state.initialTimer);
        clearTimeout(this.state.checkTimer);
        let initialTimer = setTimeout(() => {
            this.props.onFlipAllDown();
            this.setState({initialTimerInProgress: false});
        }, 5000);
        this.setState({
            initialTimer,
            initialTimerInProgress: true,
            checkTimerInProgress: false

        });
        this.props.onStartNewGame();
    };


    render() {
        if(!this.state.gameLoading)
            return(
                <PlayField
                    onStartNewGame={this.handleStartNewGame}
                    score={this.props.score}
                >
                    {this.props.cards.map((card,index) =>
                        <Card
                            {...card}
                            index={index}
                            onCardClick={this.handleCardClick}
                            key={index}
                            image={imagesReq(`./${CardsTypes[card.type]}.png`, true)}
                        />
                    )}
                </PlayField>
            );
        else return <div>Loading</div>
        //(<LoadingScreen />)
    }

    handleCardClick = (cardIndex) => {
        if(!this.state.initialTimerInProgress)
        if(!this.state.checkTimerInProgress) {
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
        this.props.onConfirmCard(cardIndex);
        this.props.onConfirmCard(this.props.checkingCardIndex);
        this.addScore();
        this.props.onChangeCheckingCard(-1);
    }

    handleWrongGuess(cardIndex) {
        let checkTimer = setTimeout(() => {
            this.props.onFlipCardDown(cardIndex);
            this.props.onFlipCardDown(this.props.checkingCardIndex);
            this.props.onChangeCheckingCard(-1);
            this.setState({
                checkTimerInProgress: false
            });
        }, 2000);

        this.reduceScore();

        this.setState({
            checkTimer,
            checkTimerInProgress: true
        });
    }



    addScore() {
        this.props.onChangeScore(
            (this.props.cards.length / 2 - this.getConfirmedPairsCount()) * 42
        );
    }
    reduceScore() {
        this.props.onChangeScore(
            (-this.getConfirmedPairsCount() * 42)
        );
    }
    getConfirmedPairsCount() {
        let cardsConfirmed = 0;
        for(let i = 0; i < this.props.cards.length; i++) {
            if(this.props.cards[i].isConfirmed)
                cardsConfirmed++;
        }
        return cardsConfirmed / 2;
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
        onStartNewGame: () => { //change to ownprops and start game on component mount
            dispatch(setCards(getNewSetOfCards(ownProps.size)));
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
        onFlipAllDown: () => {
            dispatch(flipAllDown());
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