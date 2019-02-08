import React from 'react'

export const MainControl = (props) => {
    const doubleDigits = (number) => {
        let doubleString = "0" + number;
        return doubleString.slice(-2)
    }

    return(
        <div id="main-control">
            <div id="timer-label">{props.status}</div>
            <div id="time-left">{`${doubleDigits(props.minutes)}:${doubleDigits(props.seconds)}`}</div>
            <audio id="beep" src="/src/audio/beep.wav" type="audio/wav"></audio>
            <div id="control-button-wrapper">
                <button id="start_stop" onClick={props.startStop}>start-stop</button>
                <button id="reset" onClick={props.reset}>reset</button>
            </div>
        </div>
    )
}