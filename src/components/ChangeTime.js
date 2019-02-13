import React from 'react';
import { firstCapital } from '../utils/functions'


export const ChangeTime = (props) => {
    return(
        <div id={`change-${props.name}`} className="change-component">
            <div id={`${props.name}-label`}>{`${firstCapital(props.name)} Length`}</div>
            <div id={`${props.name}-controls`} className="controls-wrapper">
                <button id={`${props.name}-increment`} onClick={props.increment}>increment</button>
                <div id={`${props.name}-length`}>{props[props.name]}</div>
                <button id={`${props.name}-decrement`} onClick={props.decrement}>decrement</button>
            </div>
        </div>
    )
}