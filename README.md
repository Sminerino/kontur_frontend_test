Memory game || SKB Kontur frontend internship entry test.

Hosted app: https://memory-game-smn.surge.sh


Task formulation can be accessed through the link below:
https://docs.google.com/document/d/1mGdzJfIA9TTFPbMs8etZjPWQ_VSlIV7RWc4kcJXXTQI/edit#

###### Installing:
    npm i || yarn install
###### Running:
    npm run start || yarn start
###### Testing:
    npm run test || yarn test


###### Libraries/instruments used to build/test the app:
1. React
2. create-react-app
3. Redux
4. react-redux
5. Immutable.js
6. react-router
7. jest
8. enzyme

###### Score algorithm:
Score to add/subtract is calculated for the state before the cards flip.
I.e.:

initial state:
score: 0
pairs of cards: 5
all cards are flipped down

user opens two cards and it's a match; then, the score will be: 0 + 42 * 5
where 0 is initial score, 42 - score multiplier, and 5 - number of flipped down pairs
not 4, cause it's calculated before the pair is flipped

same with an unsuccessful guess.

###### Notes:
1. time for which wrongly guessed cards are shown: 2000ms
2. initial time for card remembering: 5000ms
3. tests mostly check components and business logic, not much of redux is tested
4. score changing algorithm was also tested manually through adding a mock of random card generation
and shuffling function; and then checking if the algorithm works as intended;
5. the biggest amount of points one can get is 1890 (42 \* 9 + 42 \* 8 + ... +42 \* 1)
6. there can be negative total score
7. app is not supported by IE (all cards are rendered in a single column, because IE doesn't support some (most) of grid properties)

###### Todo:
1. ~~cards should be open for the first 5 seconds.~~
2. ~~styling~~
3. ~~start screen~~
4. ~~end screen~~
5. ~~restart button~~
6. ~~testing~~
7. ~~icon and title~~
8. ~~add enzyme~~
