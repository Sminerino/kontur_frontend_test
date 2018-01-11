import { Card } from "../../../../ViewComponents/PlayField/Card/Card";
import React from 'react';
import renderer from 'react-test-renderer';

test('Card component is rendering', ()=> {
    const card = renderer.create(
        <Card
            isFlippedUp={true}
            isConfirmed={true}
            onClick
        />
    );

    let cardJSON = card.toJSON();

    expect(cardJSON).toMatchSnapshot();
});