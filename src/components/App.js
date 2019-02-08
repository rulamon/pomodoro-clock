import React, { Component } from 'react'
import { ChangeTime } from './ChangeTime'
import { MainControl } from './MainControl'


export class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            session: 25,
            break: 5,            
            minutes: 25,
            seconds: 0,
            active: false,
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
            if(this.state.minutes == 0){
                if(this.state.status == "Session"){
                    this.setState({
                        minutes: this.state.break,
                        seconds: 0,
                        status: "Break"
                    })
                } else {
                    this.setState({
                        minutes: this.state.session,
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
    startStop(){
        if(!this.state.active){
            this.setState({active: true})
            this.runTimer = setInterval(this.countDownToggleBreak, 1000)
        } else {
            this.setState({active: false})
            clearInterval(this.runTimer)
        }
    }
    reset(){
        clearInterval(this.runTimer)
        this.setState({
            session: 25,
            break: 5,            
            minutes: 25,
            seconds: 0,
            active: false,
            status: "Session"
        })
        document.getElementById('beep').pause();
        document.getElementById('beep').currentTime = 0;
    }

    increment(event){
        if(!this.state.active){
            if(event.target.id == "break-increment" && this.state.break < 60){
                if(this.state.status == "Session"){
                    this.setState({
                        break: this.state.break + 1
                    })
                } else {
                    this.setState({
                        break: this.state.break + 1,
                        minutes: this.state.break + 1,
                        seconds: 0
                    })
                }
            }
            if(event.target.id == "session-increment" && this.state.session < 60){
                if(this.state.status == "Session"){
                    this.setState({
                        session: this.state.session + 1,
                        minutes: this.state.session + 1,
                        seconds: 0
                    })
                } else {
                    this.setState({
                        session: this.state.session + 1
                    })
                }
            }
        }        
    }

    decrement(event){
        if(!this.state.active){
            if(event.target.id == "break-decrement" && this.state.break > 1){
                if(this.state.status == "Session"){
                    this.setState({
                        break: this.state.break - 1,
                    })
                } else {
                    this.setState({
                        break: this.state.break - 1,
                        minutes: this.state.break -1,
                        seconds: 0
                    })
                }
            }
            if(event.target.id == "session-decrement" && this.state.session > 1){
                if(this.state.status == "Session"){
                    this.setState({
                        session: this.state.session - 1,
                        minutes: this.state.session - 1,
                        seconds: 0
                    })
                } else {
                    this.setState({
                        session: this.state.session - 1
                    })
                }
            }
        }        
    }

    componentDidUpdate() {
        if(this.state.minutes == 0 && this.state.seconds == 0){
            document.getElementById('beep').pause();
            document.getElementById('beep').currentTime = 0;
            document.getElementById('beep').play();
        }
    }

    render(){
        return(
            <div id="main-container">
                <ChangeTime name="break" increment={this.increment} decrement={this.decrement} break={this.state.break} />
                <ChangeTime name="session" increment={this.increment} decrement={this.decrement} session={this.state.session} />
                <MainControl minutes={this.state.minutes} seconds={this.state.seconds} status={this.state.status} startStop={this.startStop} reset={this.reset} />
            </div>
        )
    }
}