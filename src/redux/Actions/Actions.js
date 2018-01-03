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

export function changeScore(score) {
    return {
        type: ActionTypes.CHANGE_SCORE,
        score
    }
}

export function setCards(cards) {
    return {
        type: ActionTypes.SET_CARDS,
        cards
    }
}

export function changeCheckingCard(cardIndex) {
    return {
        type: ActionTypes.CHANGE_CHECKING_CARD,
        cardIndex
    }
}
