import React from 'react';

const PlayField = (props) =>
    <div className="play-field">
        <div className="score-container">
            {props.score}
        </div>
        <div className='cards-container'>
            {props.children}
        </div>
        <div onClick={() => props.onStartNewGame(3)}>
            123
        </div>
    </div>
;

export { PlayField };