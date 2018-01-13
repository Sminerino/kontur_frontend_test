// a mock that does not randomize an array and instead pushes a
// set number of card pairs to the storage like: 0,0,1,1,2,2,3,3,4,4,5,5 ...
// it's made to check if score adding/reducing algorithm is made right

export const getMockedSetOfCards = (size) => {
    let cards = [];
    for (let i = 0; i < size; i++) {
        cards.push(i);
        cards.push(i);
    }
    return cards;
};