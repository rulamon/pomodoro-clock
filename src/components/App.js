import React, { Component } from 'react'
import { ChangeTime } from './ChangeTime'
import { MainControl } from './MainControl'
import styles from '../styles.scss'


export class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            session: 25,
            break: 5,            
            minutes: 25,
            seconds: 0,
            circleClass: "animation-25",
            active: "paused",
            status: "Session"
        }
        this.countDownToggleBreak = this.countDownToggleBreak.bind(this)
        this.startStop = this.startStop.bind(this)
        this.reset = this.reset.bind(this)
        this.increment = this.increment.bind(this)
        this.decrement = this.decrement.bind(this)

    }
    countDownToggleBreak(){
        if(this.state.seconds == 0){
            // if a countdown is finished (minutes == 0), switch status and change minutes to the new countdown time as set in state.break or session
            if(this.state.minutes == 0){
                if(this.state.status == "Session"){
                    this.setState({
                        minutes: this.state.break,
                        seconds: 0,
                        status: "Break",
                        circleClass: "clear"
                    })
                    // using setTimeOut to reset circle animation
                    setTimeout(() => {
                        this.setState({
                            circleClass: `animation-${this.state.break}`
                        })
                    }, 100);
                } else {
                    this.setState({
                        minutes: this.state.session,
                        seconds: 0,
                        status: "Session",
                        circleClass: "clear"
                    })
                    setTimeout(() => {
                        this.setState({
                            circleClass: `animation-${this.state.break}`
                        })
                    }, 100);
                }               
            } else {
                // if minutes != zero, decrement minutes and change seconds to 59
                this.setState({
                    minutes: this.state.minutes - 1,
                    seconds: 59
                })
            }
        } else {
            // if minutes and seconds != zero, decrement seconds
            this.setState({
                seconds: this.state.seconds - 1
            })
        }
    }
    startStop(){
        // start timer if state.active == paused, pause otherwise. state.active also makes animation pause or run by using it as a class
        if(this.state.active == "paused"){
            this.setState({active: "running"});
            this.runTimer = setInterval(this.countDownToggleBreak, 1000)
        } else {
            this.setState({active: "paused"})
            clearInterval(this.runTimer)
        }
    }
    reset(){
        // reset to initial state
        clearInterval(this.runTimer);
        this.setState({
            session: 25,
            break: 5,            
            minutes: 25,
            seconds: 0,
            active: "paused",
            status: "Session",
            circleClass: "clear"
        })
        setTimeout(() => {
            this.setState({
                circleClass: "animation-25"
            })
        }, 100);
        document.getElementById('beep').pause();
        document.getElementById('beep').currentTime = 0;
    }

    increment(event){
        // increment if state.status != what you want to increment, otherwise nothing happens
        if(event.target.id == "break-increment" && this.state.break < 60){
            if(this.state.status == "Session"){
                this.setState({
                    break: this.state.break + 1
                })
            } else if(this.state.active == "paused" && this.state.status == "Break") {
                this.setState({
                    break: this.state.break + 1,
                    minutes: this.state.break + 1,
                    seconds: 0,
                    circleClass: "clear"
                })
                setTimeout(() => {
                    this.setState({
                        circleClass: `animation-${this.state.break}`
                    })
                }, 100);
            }
        } else if(event.target.id == "session-increment" && this.state.session < 60){
            if(this.state.status == "Session" && this.state.active == "paused"){
                this.setState({
                    session: this.state.session + 1,
                    minutes: this.state.session + 1,
                    seconds: 0,
                    circleClass: "clear"
                })
                setTimeout(() => {
                    this.setState({
                        circleClass: `animation-${this.state.session}`
                    })
                }, 100);
            } else if (this.state.status == "Break"){
                this.setState({
                    session: this.state.session + 1
                })
            }
        }
    }

    decrement(event){
        // decrement if state.status != what you want to increment, otherwise nothing happens
        if(event.target.id == "break-decrement" && this.state.break > 1){
            if(this.state.status == "Session"){
                this.setState({
                    break: this.state.break - 1,
                })
            } else if (this.state.status == "Break" && this.state.active == "paused") {
                this.setState({
                    break: this.state.break - 1,
                    minutes: this.state.break -1,
                    seconds: 0,
                    circleClass: "clear"
                })
                setTimeout(() => {
                    this.setState({
                        circleClass: `animation-${this.state.break}`
                    })
                }, 100);
            }
        } else if(event.target.id == "session-decrement" && this.state.session > 1){
            if(this.state.status == "Session" && this.state.active == "paused"){
                this.setState({
                    session: this.state.session - 1,
                    minutes: this.state.session - 1,
                    seconds: 0,
                    circleClass: "clear"
                })
                setTimeout(() => {
                    this.setState({
                        circleClass: `animation-${this.state.session}`
                    })
                }, 100);
            } else if (this.state.status == "Break"){
                this.setState({
                    session: this.state.session - 1
                })
            }
        }
    }

    componentDidUpdate() {
        // play beep when timer finishes
        if(this.state.minutes == 0 && this.state.seconds == 0){
            let beep = document.getElementById('beep');
            beep.pause();
            beep.currentTime = 0;
            beep.play();
        }
    }

    render(){
        return(
            <div id="main-container">
                <div id="change-time">
                    <ChangeTime name="break" increment={this.increment} decrement={this.decrement} break={this.state.break} />
                    <ChangeTime name="session" increment={this.increment} decrement={this.decrement} session={this.state.session} />
                </div>
                <MainControl circleClass={this.state.circleClass} active={this.state.active} minutes={this.state.minutes} seconds={this.state.seconds} status={this.state.status} startStop={this.startStop} reset={this.reset} />
            </div>
        )
    }
}