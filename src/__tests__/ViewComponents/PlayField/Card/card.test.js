/**
 * @jest-environment node
 */

import { Card } from "../../../../ViewComponents/PlayField/Card/Card";
import React from 'react';
import renderer from 'react-test-renderer';
import ShallowRenderer from 'react-test-renderer/shallow';
import { shallow } from 'enzyme';

const ShRenderer = new ShallowRenderer();

test('Card component is passing snapshot test in all 3 of its states', ()=> {
    const cardFlippedConfirmed = renderer.create(
        <Card
            isFlippedUp={true}
            isConfirmed={true}
            image='image source'
        />
    );

    let card1JSON = cardFlippedConfirmed.toJSON();

    expect(card1JSON).toMatchSnapshot();

    const cardFlipped = renderer.create(
        <Card
            isFlippedUp={true}
            isConfirmed={false}
            image='image source'
        />
    );

    let card2JSON = cardFlipped.toJSON();

    expect(card2JSON).toMatchSnapshot();

    const cardNotFlipped = renderer.create(
        <Card
            isFlippedUp={false}
            isConfirmed={false}
        />
    );

    let card3JSON = cardNotFlipped.toJSON();

    expect(card3JSON).toMatchSnapshot();
});

test('Card component returns div of needed class when given props', () => {
    const cardDown = ShRenderer.render(
        <Card
            isFlippedUp={false}
            isConfirmed={false}
        />
    );
    expect(cardDown.props.className).toBe('card card_down');

    const cardUp = ShRenderer.render(
        <Card
            isFlippedUp={true}
            isConfirmed={false}
        />
    );
    expect(cardUp.props.className).toBe('card card_up');

    const cardUpConfirmed = ShRenderer.render(
        <Card
            isFlippedUp={true}
            isConfirmed={true}
        />
    );
    expect(cardUpConfirmed.props.className).toBe('card card_confirmed');

    //if this combination of props isFlippedUp, isConfirmed is present somewhere in the state,
    //the program is not working right
    //nevertheless it is included in the test
    const cardDownConfirmed = ShRenderer.render(
        <Card
            isFlippedUp={true}
            isConfirmed={true}
        />
    );
    expect(cardDownConfirmed.props.className).toBe('card card_confirmed');

});

test('Card component renders needed image when given props', () => {
    const cardDown = renderer.create(
        <Card
            isFlippedUp={false}
            isConfirmed={false}
        />
    );
    expect(cardDown.toJSON().children[0].props.src).toBe('cardback.png');

    const cardUp = renderer.create(
        <Card
            isFlippedUp={true}
            isConfirmed={false}
            image='required image'
        />
    );
    expect(cardUp.toJSON().children[0].props.src).toBe('required image');

    const cardUpConfirmed = renderer.create(
        <Card
            isFlippedUp={true}
            isConfirmed={true}
            image='required image'
        />
    );
    expect(cardUp.toJSON().children[0].props.src).toBe('required image');

    //if this combination of props isFlippedUp, isConfirmed is present somewhere in the state,
    //the program is not working right
    //nevertheless it is included in the test
    const cardDownConfirmed = renderer.create(
        <Card
            isFlippedUp={false}
            isConfirmed={true}
        />
    );
    expect(cardDownConfirmed.toJSON().children[0].props.src).toBe('cardback.png');

});

test('Only flipped down card is responsive to clicks', () => {
    let numberOfRegisteredCardClicks = 0;
    const cardDown = shallow(
        <Card
            isFlippedUp={false}
            isConfirmed={false}
            onCardClick={() => numberOfRegisteredCardClicks++}
        />
    );
    const cardUp = shallow(
        <Card
            isFlippedUp={true}
            isConfirmed={false}
            image='required image'
            onCardClick={() => numberOfRegisteredCardClicks++}
        />
    );
    const cardUpConfirmed = shallow(
        <Card
            isFlippedUp={true}
            isConfirmed={true}
            image='required image'
            onCardClick={() => numberOfRegisteredCardClicks++}
        />
    );

    //if this combination of props isFlippedUp, isConfirmed is present somewhere in the state,
    //the program is not working right
    //nevertheless it is included in the test
    const cardDownConfirmed = shallow(
        <Card
            isFlippedUp={false}
            isConfirmed={true}
            onCardClick={() => numberOfRegisteredCardClicks++}
        />
    );

    cardDown.find('div').simulate('click');
    cardUp.find('div').simulate('click');
    cardUpConfirmed.find('div').simulate('click');
    cardDownConfirmed.find('div').simulate('click');

    expect(numberOfRegisteredCardClicks).toEqual(2);
});
