import React from 'react';
import { RestartButton } from "../PlayField/RestartButton/RestartButton";

const EndPage = ({score, onRestart}) =>
    <div className='end-screen-container'>
        <img
            src={require('./../../res/Other/end.png')}
            className='end-screen__image'
            alt='End'
        />
        <div className='end-screen__text-container'>
            <p>Congratulations!</p>
            <p>Your score is: {score}</p>
        </div>
        <RestartButton
            onClick={onRestart}
        />
    </div>;

export { EndPage };
