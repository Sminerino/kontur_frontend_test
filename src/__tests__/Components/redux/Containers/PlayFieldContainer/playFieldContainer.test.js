/**
 * @jest-environment node
 */
import 'jsdom-global/register';
import React from 'react';
import { shallow, mount } from 'enzyme';
import { PlayFieldContainer } from '../../../../../redux/Containers/PlayFieldContainer/PlayFieldContainer';
import { getNewSetOfCards } from "../../../../../redux/Containers/PlayFieldContainer/PlayFieldContainer";

test('Random card generation algorithm outputs array of needed size', () => {
    expect(getNewSetOfCards(-2)).toEqual([]);
    expect(getNewSetOfCards(0)).toEqual([]);
    expect(getNewSetOfCards(1).length).toEqual(2);
    expect(getNewSetOfCards(5).length).toEqual(10);
});

test('Random card generation algorithm outputs' +
    ' an array with exactly 2 cards of each type',
    () => {
    function arrayContainsExactly2GivenNumbers(array, number) {
        let count = 0;
        for(let i = 0; i < array.length; i++) {
            if(array[i] === number) count++;
        }
        if(array.length === 0) return true;
        return count === 2;
    }
    let exceptions = 0;

    for(let i = 1; i < 20; i++) {
        let arr = getNewSetOfCards(i);
        arr.forEach(number => {
            if (!arrayContainsExactly2GivenNumbers(arr, number)) exceptions++;
        });
    }

    expect(exceptions).toEqual(0);
});

test('PlayFieldContainer component renders even without props from storage', () => {
    jest.useFakeTimers();
    const PlayField = shallow(
        <PlayFieldContainer  />
    );
});

test('Initial timer and check timer are reset with component remounting', () => {
    jest.useFakeTimers();
    let playField = shallow(
        <PlayFieldContainer
            cards={[]}
            score={0}
            checkingCardIndex={-1}
            initialTimerInProgress={false}
            checkTimerInProgress={false}
            onStartNewGame={() => {}}
        />
    );

    playField.update();

    expect(clearTimeout).toHaveBeenCalledTimes(2); //rerendering should not trigger timer restart

    playField = shallow(
        <PlayFieldContainer
            cards={[]}
            score={0}
            checkingCardIndex={-1}
            initialTimerInProgress={false}
            checkTimerInProgress={false}
            onStartNewGame={() => {}}
        />
    );

    playField = shallow(
        <PlayFieldContainer
            cards={[]}
            score={0}
            checkingCardIndex={-1}
            initialTimerInProgress={false}
            checkTimerInProgress={false}
            onStartNewGame={() => {}}
        />
    );
    expect(clearTimeout).toHaveBeenCalledTimes(6); //remounting the component, however, should
});

test('Timers are reset with starting new game', () => {
    jest.useFakeTimers();

    let playField = shallow(
        <PlayFieldContainer
            cards={[]}
            score={0}
            checkingCardIndex={-1}
            initialTimerInProgress={false}
            checkTimerInProgress={false}
            onStartNewGame={() => {}}
        />
    );
    playField.instance().handleStartNewGame();
    jest.runAllTimers();

    expect(clearTimeout).toHaveBeenCalledTimes(4); //initial 2 resets + 2 in handleStartNewGame method
});

test('PlayFieldContainer should correctly calculate ' +
    'the score based on the number of confirmed cards passed to it', () => {
    let cardMocks = [ //4 confirmed pairs and 2 not confirmed
        {isConfirmed: true},
        {isConfirmed: true},
        {isConfirmed: true},
        {isConfirmed: true},
        {isConfirmed: true},
        {isConfirmed: true},
        {isConfirmed: true},
        {isConfirmed: true},
        {isConfirmed: false},
        {isConfirmed: false},
        {isConfirmed: false},
        {isConfirmed: false}];
    let scoreAfterChange = 0;
    let playField = shallow(
        <PlayFieldContainer
            cards={cardMocks}
            score={0}
            checkingCardIndex={-1}
            initialTimerInProgress={false}
            checkTimerInProgress={false}
            onStartNewGame={() => {}}
            onChangeScore={(score) => {scoreAfterChange += score}}
        /> );

    playField.instance().addScore();
    expect(scoreAfterChange).toEqual(42*2);
    playField.instance().reduceScore();
    expect(scoreAfterChange).toEqual(42*2 - 4*42);
});

test('PlayFieldContainer should correctly calculate' +
    ' the score even if given odd number of confirmed cards (not every confirmed card' +
    ' has a pair), in this case, these 2 cards count as not confirmed', () => {
    let cardMocks = [ //7 confirmed cards and 5 not confirmed
        {isConfirmed: true},
        {isConfirmed: true},
        {isConfirmed: true},
        {isConfirmed: true},
        {isConfirmed: true},
        {isConfirmed: true},
        {isConfirmed: true},
        {isConfirmed: false},
        {isConfirmed: false},
        {isConfirmed: false},
        {isConfirmed: false},
        {isConfirmed: false}];
    let scoreAfterChange = 0;
    let playField = shallow(
        <PlayFieldContainer
            cards={cardMocks}
            score={0}
            checkingCardIndex={-1}
            initialTimerInProgress={false}
            checkTimerInProgress={false}
            onStartNewGame={() => {}}
            onChangeScore={(score) => {scoreAfterChange += score}}
        /> );

    playField.instance().addScore();
    expect(scoreAfterChange).toEqual(42*3);
    playField.instance().reduceScore();
    expect(scoreAfterChange).toEqual(42*3 - 3*42);
});