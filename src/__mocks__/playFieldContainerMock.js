// a mock that does not randomize an array and instead pushes a
// set number of card pairs to the storage like: 0,0,1,1,2,2,3,3,4,4,5,5 ...
// it's made to check if score adding/reducing algorithm is made right

import React from 'react';
import { connect } from 'react-redux';
import {mapStateToProps, PlayFieldContainer} from "../redux/Containers/PlayFieldContainer/PlayFieldContainer";
import {
    changeCheckingCard,
    changeScore,
    confirmCard,
    flipCardDown,
    flipCardUp,
    startCheckTimer,
    startNewGame,
    stopCheckTimer,
    stopInitialTimer
} from "../redux/Actions/Actions";

export const getMockedSetOfCards = (size) => {
    let cards = [];
    for (let i = 0; i < size; i++) {
        cards.push(i);
        cards.push(i);
    }
    return cards;
};

const mapDispatchToPropsMock = (dispatch, ownProps) => {
    return {
        onStartNewGame: () => {
            dispatch(startNewGame(getMockedSetOfCards(ownProps.size || 9)));
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

export const PlayFieldContainerMocked = connect(
    mapStateToProps,
    mapDispatchToPropsMock
)(PlayFieldContainer);