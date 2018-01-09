import React from 'react';

const RestartButton = ({onClick}) =>
    <div>
        <div
            className="restart-button"
            onClick={onClick}
        >
            Restart
        </div>
    </div>
;

export { RestartButton };