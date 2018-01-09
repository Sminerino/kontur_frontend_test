import React from 'react';
import { RestartButton } from './RestartButton/RestartButton';

const PlayField = (props) =>
    <div className='play-field-container' data-tid="Deck">
        <div className="play-field">
            <div className="play-field__header">
                <div className="play-field__restart-button-container">
                    <RestartButton
                        onClick={props.onStartNewGame}
                        data-tid='Menu-newGame'
                    />
                </div>
                <div className="play-field__score">
                    Score:
                    <div data-tid='Menu-scores'>
                        {props.score}
                    </div>
                </div>
            </div>
            <div className='play-field__cards-container'>
                {props.children}
            </div>
        </div>
    </div>
;

export { PlayField };