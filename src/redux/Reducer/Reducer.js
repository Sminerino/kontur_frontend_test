import { ActionTypes } from './../ActionTypes/ActionTypes';
import Immutable from 'immutable';

const immCard = Immutable.Record({
    type: NaN,
    isFlippedUp: false,
});

const initialState = {
    cards: Immutable.List(),
    score: 0,
    checkingCardIndex: NaN
};

function appReducer(state = initialState, action) {
    return {
        cards: cardsReducer(state.cards, action),
        score: scoreReducer(state.score, action),
        checkingCardIndex: checkingCardIndexReducer(state.checkingCardIndex, action)
    };
}

function cardsReducer(state = Immutable.List(), action) {
    switch (action.type) {
        case ActionTypes.FLIP_CARD_UP:
            if(action.cardIndex)
                return state.setIn([action.cardIndex, 'isFlippedUp'], true);
            return state;
        case ActionTypes.FLIP_CARD_DOWN:
            if(action.cardIndex)
                return state.setIn([action.cardIndex, 'isFlippedUp'], false);
            return state;
        case ActionTypes.SET_CARDS:
            if(action.cards) {
                let cardsArray = action.cards.map(_card => new immCard({
                    type: _card.type
                }));
                return new Immutable.List(cardsArray);
            }
            return state;
        default:
            return state;
    }
}

function scoreReducer(state = 0, action) {
    switch (action.type) {
        case ActionTypes.CHANGE_SCORE:
            if(action.score)
                return state + action.score;
            return state;
        case ActionTypes.SET_CARDS:
            return 0;
        default: return state;
    }
}

function checkingCardIndexReducer(state = NaN, action) {
    switch(action.type) {
        case ActionTypes.CHANGE_CHECKING_CARD:
            if(action.cardIndex)
                return action.cardIndex;
            return state;
        default: return state;
    }
}

export { appReducer };