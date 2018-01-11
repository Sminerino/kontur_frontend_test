Memory game || SKB Kontur frontend internship entry test.

Hosted app: memory-game-smn.herokuapp.com || memory-game-smn.surge.sh


Task formulation can be accessed through the link below:
https://docs.google.com/document/d/1mGdzJfIA9TTFPbMs8etZjPWQ_VSlIV7RWc4kcJXXTQI/edit#

###### Installing:
    npm i || yarn install
###### Running:
    npm run start || yarn start

###### Libraries/instruments used to build the app:
1. React
2. create-react-app
3. Redux
4. react-redux
5. Immutable.js
6. react-router

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

###### Todo:
1. ~~cards should be open for the first 5 seconds.~~
2. ~~styling~~
3. ~~start screen~~
4. ~~end screen~~
5. ~~restart button~~
6. ~~testing~~ meh
7. ~~icon and title~~
8. add enzyme