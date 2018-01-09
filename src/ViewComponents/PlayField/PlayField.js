import React from 'react';
import { RestartButton } from './RestartButton/RestartButton';

const PlayField = (props) =>
    <div className='play-field-container'>
        <div className="play-field">
            <div className="play-field__header">
                <div className="play-field__restart-button-container">
                    <RestartButton
                        onClick={props.onStartNewGame}
                    />
                </div>
                <div className="play-field__score">
                    Score:  {props.score}
                </div>
            </div>
            <div className='play-field__cards-container'>
                {props.children}
            </div>
        </div>
    </div>
;

export { PlayField };