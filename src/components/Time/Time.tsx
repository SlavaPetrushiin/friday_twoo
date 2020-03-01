import React from 'react';
import style from './Time.module.css';
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
import Moment from 'react-moment';
import 'moment-timezone';


interface IProps {


}

interface IState {
    date: any,
    timeStart: any,
    timeEnd: any,
    resultTime: any,
    playVisible: boolean,
    buttonTitleValue: boolean,
    time: number,
    isOn: boolean,
    start: number,
    resultTimeTimer: number,
    startResultTimer: number,
    startPauseTimer:number,
    resultPauseTimer:number
}

class Time extends React.Component<IProps, IState> {
    timer: any;
    resultTimer: any;
    pauseTimer: any;
    state: IState = {
        date: new Date(),
        timeStart: '',
        timeEnd: '',
        resultTime: '',
        playVisible: false,
        buttonTitleValue: false,
        isOn: false,

        start: 0,
        time: 0,

        startResultTimer: 0,
        resultTimeTimer: 0,

        startPauseTimer:0,
        resultPauseTimer:0


    }
    startTimer = () => {
        this.setState({
            playVisible: true,
            isOn: true,
            time: this.state.time,
            resultTimeTimer: this.state.resultTimeTimer,
            start: Date.now() - this.state.time,
            startResultTimer: Date.now() - this.state.resultTimeTimer
        })
        this.timer = setInterval(() => this.setState({
            time: Date.now() - this.state.start
        }), 1);
        this.resultTimer = setInterval(() => this.setState({
            resultTimeTimer: Date.now() - this.state.startResultTimer
        }), 1);
    }
    stopTimer = () => {
        this.setState({isOn: false, time: 0, resultTimeTimer: 0,resultPauseTimer:0, playVisible: false,buttonTitleValue: false})
        clearInterval(this.timer)
        clearInterval(this.resultTimer)
        clearInterval(this.pauseTimer)
    }

    getResultTime = () => {
        this.setState({resultTime: this.state.timeStart.format("HH:mm:ss") - this.state.timeEnd.format("HH:mm:ss")})
    }
    changeTimeStart = (time: any) => {
        this.setState({timeStart: time})
    }
    changeTimeEnd = (time: any) => {
        this.setState({timeEnd: time})
    }

    setTimerPause = (e: any) => {
        clearInterval(this.resultTimer);
        this.setState({buttonTitleValue: true,startPauseTimer:Date.now() - this.state.resultPauseTimer,startResultTimer:this.state.resultTimeTimer})
        this.pauseTimer = setInterval(() => this.setState({
            resultPauseTimer: Date.now() - this.state.startPauseTimer
        }), 1);

    }
    setTimerPlay = (e: any) => {
        this.setState({buttonTitleValue: false})
    }


    render() {
        return (
            <div className={style.container}>
                <div className={style.wrapper}>
                    <div>time</div>
                    <div>{this.state.date.toLocaleTimeString()}</div>
                    <div><input type={"time"}/></div>
                    <div><TimePicker onChange={this.changeTimeStart}
                                     value={this.state.timeStart}/>---
                        <TimePicker onChange={this.changeTimeEnd}
                                    value={this.state.timeEnd}/>===
                        <TimePicker onChange={this.getResultTime}
                                    value={this.state.resultTime}/></div>

                    <div>time tracker</div>
                    <Moment format="HH:mm:ss" interval={1000}/>
                    <div> (start time: <Moment format="HH:mm:ss" interval={1000}/>) -(end time:<Moment format="HH:mm:ss"
                                                                                                       interval={1000}/>)
                        = (all time: {this.state.time}) -(pause time: {this.state.resultPauseTimer}) =(result:{this.state.resultTimeTimer} )
                    </div>
                    <div>
                        {this.state.playVisible ? <div>
                            <button onClick={this.stopTimer}>Stop</button>
                            {this.state.buttonTitleValue ? <button onClick={this.setTimerPlay}>Play</button> :
                                <button onClick={this.setTimerPause}>Pause</button>}

                        </div> : <button onClick={this.startTimer}>Play</button>}
                    </div>
                </div>
            </div>
        )
    }
}

export default Time;

