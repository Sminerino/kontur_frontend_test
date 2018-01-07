import React from 'react';

const PlayField = (props) =>
    <div className="play-field">
        <div className="play-field__header">
            <div className="play-field__restart-button-container">
                <div
                    className="play-field__restart-button"
                    onClick={props.onStartNewGame}
                >
                    Restart
                </div>
            </div>
            <div className="play-field__score">
                Score:  {props.score}
            </div>
        </div>
        <div className='play-field__cards-container'>
            {props.children}
        </div>
    </div>
;

export { PlayField };