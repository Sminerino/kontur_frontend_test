import {ActionTypes} from "../ActionTypes/ActionTypes";

export function flipCardUp(cardIndex) {
    return {
        type: ActionTypes.FLIP_CARD_UP,
        cardIndex
    }
}

export function flipCardDown(cardIndex) {
    return {
        type: ActionTypes.FLIP_CARD_DOWN,
        cardIndex
    }
}

export function confirmCard(cards) {
    return {
        type: ActionTypes.CONFIRM_PAIR,
        cards
    }
}

export function changeScore(score) {
    return {
        type: ActionTypes.CHANGE_SCORE,
        score
    }
}

export function startNewGame(cards) {

    return {
        type: ActionTypes.START_NEW_GAME,
        cards
    }
}

export function changeCheckingCard(cardIndex) {
    return {
        type: ActionTypes.CHANGE_CHECKING_CARD,
        cardIndex
    }
}

export function stopInitialTimer() {
    return {
        type: ActionTypes.INITIAL_TIMER_END
    }
}

export function startCheckTimer(wrongCardIndex) {
    return {
        type: ActionTypes.CHECK_TIMER_START,
        wrongCardIndex
    }
}

export function stopCheckTimer() {
    return {
        type: ActionTypes.CHECK_TIMER_END
    }
}