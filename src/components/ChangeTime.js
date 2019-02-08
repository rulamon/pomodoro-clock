import React from 'react';


export const ChangeTime = (props) => {
    const firstCapital = (string) => {
        return string.substring(0,1).toUpperCase() + string.substring(1);
    }
    return(
        <div id={`change-${props.name}`}>
            <div id={`${props.name}-label`}>{`${firstCapital(props.name)} Length`}</div>
            <div id="button-wrapper">
                <button id={`${props.name}-increment`} onClick={props.increment}>increment</button>
                <button id={`${props.name}-decrement`} onClick={props.decrement}>decrement</button>
            </div>
            <div id={`${props.name}-length`}>{props[props.name]}</div>
        </div>
    )
}