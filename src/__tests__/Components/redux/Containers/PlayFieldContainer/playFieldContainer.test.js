/**
 * @jest-environment node
 */
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

