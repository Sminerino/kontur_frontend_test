import React from 'react';
import { Link } from 'react-router-dom';

const StartPage = (props) =>
    <div className='start-page-container' data-tid='App'>
        <img
            src={require('./../../res/Other/start.png')}
            className='start-page__image'
            alt='Start'
        />
        <div className='start-page__title'>
            MEMORY GAME
        </div>
        <Link
            to={'/game'}
            className='start-page__play-button'
            data-tid='NewGame-startGame'
        >
            Play
        </Link>
    </div>;

export { StartPage };