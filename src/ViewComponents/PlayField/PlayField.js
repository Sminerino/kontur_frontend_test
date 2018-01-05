import React from 'react';

const PlayField = (props) =>
    <div className="play-field">
        <div className="score-container">
            {props.score}
        </div>
        <div className='cards-container'>
            {props.children}
        </div>
    </div>
;

export { PlayField };