import React from 'react';

export class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            startSession: 25,
            startBreak: 5,            
            minutes: 25,
            seconds: 0,
            active: false,
            status: "Session"
        }
        this.doubleSeconds = this.doubleSeconds.bind(this)
        this.countDownToggleBreak = this.countDownToggleBreak.bind(this)
        this.startPause = this.startPause.bind(this)
        this.reset = this.reset.bind(this)
        this.increment = this.increment.bind(this)
        this.decrement = this.decrement.bind(this)
    }
    doubleSeconds(number){
        let doubleString = "0" + number;
        return doubleString.slice(-2)
    }
    countDownToggleBreak(){
        if(this.state.seconds == 0){
            if(this.state.minutes == 0){
                if(this.state.status == "Session"){
                    this.setState({
                        minutes: this.state.startBreak,
                        seconds: 0,
                        status: "Break"
                    })
                } else {
                    this.setState({
                        minutes: this.state.startSession,
                        seconds: 0,
                        status: "Session"
                    })                    
                }               
            } else {
                this.setState({
                    minutes: this.state.minutes - 1,
                    seconds: 59
                })
            }
        } else {
            this.setState({
                seconds: this.state.seconds - 1
            })
        }
    }
    startPause(){
        if(!this.state.active){
            this.setState({active: true})
            this.runTimer = setInterval(this.countDownToggleBreak, 100)
        } else {
            this.setState({active: false})
            clearInterval(this.runTimer)
        }
    }
    reset(){
        clearInterval(this.runTimer)
        this.setState({
            startSession: 25,
            startBreak: 5,            
            minutes: 25,
            seconds: 0,
            active: false,
            status: "Session"
        })
    }

    increment(event){
        if(!this.state.active){
            if(event.target.id == "break-increment" && this.state.startBreak < 60){
                if(this.state.status == "Session"){
                    this.setState({
                        startBreak: this.state.startBreak + 1
                    })
                } else {
                    this.setState({
                        startBreak: this.state.startBreak + 1,
                        minutes: this.state.startBreak + 1,
                        seconds: 0
                    })
                }
            }
            if(event.target.id == "session-increment" && this.state.startSession < 60){
                if(this.state.status == "Session"){
                    this.setState({
                        startSession: this.state.startSession + 1,
                        minutes: this.state.startSession + 1,
                        seconds: 0
                    })
                } else {
                    this.setState({
                        startSession: this.state.startSession + 1
                    })
                }
            }
        }        
    }

    decrement(event){
        if(!this.state.active){
            if(event.target.id == "break-decrement" && this.state.startBreak > 1){
                if(this.state.status == "Session"){
                    this.setState({
                        startBreak: this.state.startBreak - 1,
                    })
                } else {
                    this.setState({
                        startBreak: this.state.startBreak - 1,
                        minutes: this.state.startBreak -1,
                        seconds: 0
                    })
                }
            }
            if(event.target.id == "session-decrement" && this.state.startSession > 1){
                if(this.state.status == "Session"){
                    this.setState({
                        startSession: this.state.startSession - 1,
                        minutes: this.state.startSession - 1,
                        seconds: 0
                    })
                } else {
                    this.setState({
                        startSession: this.state.startSession - 1
                    })
                }
            }
        }        
    }

    render(){
        return(
            <div id="main-container">
                {`Time ${this.state.minutes}:${this.doubleSeconds(this.state.seconds)}`}
                <button id="start_stop" onClick={this.startPause}>start/stop</button>
                <button id="reset" onClick={this.reset}>reset</button>
                {`Session ${this.state.startSession}`}
                <button id="session-increment" onClick={this.increment}>session-increment</button>
                <button id="session-decrement" onClick={this.decrement}>session-decrement</button>
                {`Break ${this.state.startBreak}`}
                <button id="break-increment" onClick={this.increment}>break-increment</button>
                <button id="break-decrement" onClick={this.decrement}>break-decrement</button>
            </div>
        )
    }
}