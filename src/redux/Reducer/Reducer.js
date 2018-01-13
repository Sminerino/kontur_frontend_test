import { ActionTypes } from './../ActionTypes/ActionTypes';
import Immutable from 'immutable';

const immCard = Immutable.Record({
    type: NaN,
    isFlippedUp: true,
    isConfirmed: false
});

const initialState = {
    cards: Immutable.List(),
    score: 0,
    checkingCardIndex: -1,

    initialTimerInProgress: true,
    checkTimerInProgress: false
};

function appReducer(state = initialState, action) {
    return {
        cards: cardsReducer(state.cards, action),
        score: scoreReducer(state.score, action),
        checkingCardIndex: checkingCardIndexReducer(state.checkingCardIndex, action),
        wrongCardIndex: wrongCardIndexReducer(state.wrongCardIndex, action),
        initialTimerInProgress: initialTimerReducer(state.initialTimerInProgress, action),
        checkTimerInProgress: checkTimerReducer(state.checkTimerInProgress, action)
    };
}

function cardsReducer(state = Immutable.List(), action) {
    switch (action.type) {
        case ActionTypes.FLIP_CARD_UP:
            if(action.cardIndex >= 0)
                return state.setIn([action.cardIndex, 'isFlippedUp'], true);
            return state;
        case ActionTypes.FLIP_CARD_DOWN:
            if(action.cardIndex >= 0)
                return state.setIn([action.cardIndex, 'isFlippedUp'], false);
            return state;
        case ActionTypes.CONFIRM_PAIR:
            if(action.cards && action.cards.length === 2)
                return state.withMutations(_state =>
                    _state
                        .setIn([action.cards[0], 'isConfirmed'], true)
                        .setIn([action.cards[1], 'isConfirmed'], true)
                );
            return state;
        case ActionTypes.INITIAL_TIMER_END:
            return state.withMutations(_state => {
                    _state.forEach((entry, index) => _state.setIn([index,'isFlippedUp'], false))
                }
            );
        case ActionTypes.START_NEW_GAME:
            if(action.cards) {
                let cardsArray = action.cards.map(_card => new immCard({
                    type: _card
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
        case ActionTypes.START_NEW_GAME:
            return 0;
        default: return state;
    }
}

function checkingCardIndexReducer(state = -1, action) {
    switch(action.type) {
        case ActionTypes.CHANGE_CHECKING_CARD:
            if(action.cardIndex >= 0)
                return action.cardIndex;
            return state;
        case ActionTypes.START_NEW_GAME:
            return -1;
        case ActionTypes.CONFIRM_PAIR:
            return -1;
        case ActionTypes.CHECK_TIMER_END:
            return -1;
        default: return state;
    }
}

function wrongCardIndexReducer(state = -1, action) {
    switch(action.type) {
        case ActionTypes.CHECK_TIMER_START:
            if(action.wrongCardIndex >= 0)
                return action.wrongCardIndex;
            return state;
        case ActionTypes.CHECK_TIMER_END:
            return -1;
        default: return state;
    }
}

function initialTimerReducer(state = true, action) {
    switch(action.type) {
        case ActionTypes.START_NEW_GAME:
            return true;
        case ActionTypes.INITIAL_TIMER_END:
            return false;
        default: return state;
    }
}

function checkTimerReducer(state = false, action) {
    switch(action.type) {
        case ActionTypes.START_NEW_GAME:
            return false;
        case ActionTypes.CHECK_TIMER_START:
            return true;
        case ActionTypes.CHECK_TIMER_END:
            return false;
        default: return state;
    }
}

export { appReducer };