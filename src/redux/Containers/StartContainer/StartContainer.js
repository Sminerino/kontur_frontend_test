import { connect } from 'react-redux';
import { setCards } from "../../Actions/Actions";
//import startup screen component as StartScreen

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

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onStartNewGame: () => {
            dispatch(setCards(getNewSetOfCards(ownProps.size)));
        }
    }
};
//also make the onStartNewGame open new router link with the game

const StartContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(StartScreen);

export { StartContainer };