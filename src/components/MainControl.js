import React from 'react'
import { doubleDigits } from '../utils/functions' 

export const MainControl = (props) => {
    return(
        <div id="main-control">
            <div id="timer-circle">
                <svg>
                    <circle className={`${props.circleClass} ${props.active}`} r="200px" fill="none" strokeWidth="2px" cx="225px" cy="225px" stroke="black"></circle>
                </svg>
                <div id="countdown-wrapper">
                    <div id="timer-label">{props.status}</div>
                    <div id="time-left">{`${doubleDigits(props.minutes)}:${doubleDigits(props.seconds)}`}</div>
                </div>
            </div>
            <audio id="beep" src="/src/audio/beep.wav" type="audio/wav"></audio>
            <div id="control-button-wrapper">
                <button id="start_stop" onClick={props.startStop}>start-stop</button>
                <button id="reset" onClick={props.reset}>reset</button>
            </div>
        </div>
    )
}