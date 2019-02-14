import React from 'react'
import { doubleDigits } from '../utils/functions' 

export const MainControl = (props) => {
    return(
        <div id="main-control">
            <div id="timer-circle">
                <svg>
                    {/* grey fixed circle and green animated circle (animated with stroke-dashoffset, classes triggered by state) */}
                    <circle r="160px" fill="none" strokeWidth="2px" cx="200px" cy="200px" stroke="#555555"></circle>
                    <circle className={`${props.circleClass} ${props.active}`} r="160px" fill="none" strokeWidth="2px" cx="200px" cy="200px" stroke="#00AA00"></circle>
                </svg>
                <div id="countdown-wrapper">
                    <div id="timer-label">{props.status}</div>
                    <div id="time-left">{`${doubleDigits(props.minutes)}:${doubleDigits(props.seconds)}`}</div>
                </div>
            </div>
            <audio id="beep" src="/src/audio/beep.wav" type="audio/wav"></audio>
            <div id="control-button-wrapper">
                <button id="start_stop" onClick={props.startStop} className="control-btn">{props.active == "paused" ? "Start" : "Pause"}</button>
                <button id="reset" onClick={props.reset} className="control-btn">Reset</button>
            </div>
        </div>
    )
}