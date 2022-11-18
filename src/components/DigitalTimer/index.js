import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {
    timer: 25,
    isRunning: false,
    timeElapsedInSeconds: 0,
  }

  componentWillUnmount() {
    this.clearTimerInterval()
  }

  clearTimerInterval = () => clearInterval(this.intervalId)

  substractOnTimer = () => {
    const {timer} = this.state

    if (timer > 1) {
      this.setState(prevState => ({
        timer: prevState.timer - 1,
      }))
    }
  }

  addingOnTimer = () => {
    this.setState(prevState => ({timer: prevState.timer + 1}))
  }

  getResetTimer = () => {
    this.clearTimerInterval()
    this.setState({timer: 25, isRunning: false, timeElapsedInSeconds: 0})
  }

  incrementTimeElapsedInSeconds = () => {
    const {timer, timeElapsedInSeconds} = this.state
    const isTimerCompleted = timeElapsedInSeconds === timer * 60

    if (isTimerCompleted) {
      this.clearTimerInterval()
      this.setState({isRunning: false})
    } else {
      this.setState(prevState => ({
        timeElapsedInSeconds: prevState.timeElapsedInSeconds + 1,
      }))
    }
  }

  startAndPauseTimer = () => {
    const {timer, isRunning, timeElapsedInSeconds} = this.state
    const isTimerComplete = timeElapsedInSeconds === timer * 60

    if (isTimerComplete) {
      this.setState({timeElapsedInSeconds: 0})
    }

    if (isRunning) {
      this.clearTimeInterval()
    } else {
      this.intervalId = setInterval(this.incrementTimeElapsedInSeconds, 1000)
    }
    this.setState(prevState => ({isRunning: !prevState.isRunning}))
  }

  getElapsedSecondsInTimeFormat = () => {
    const {timer, timeElapsedInSeconds} = this.state
    const totalRemaingSeconds = timer * 60 - timeElapsedInSeconds

    const minutes = Math.flooor(totalRemaingSeconds / 60)
    const seconds = Math.floor(totalRemaingSeconds % 60)
    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`

    return `${stringifiedMinutes} : ${stringifiedSeconds}`
  }

  render() {
    const {timer, isRunning, timeElapsedInSeconds} = this.state
    const startAndPause = isRunning ? 'Pause' : 'Start'
    const imageStartAndPause = isRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    const pauseAndRunning = isRunning ? 'Running' : 'Paused'
    const isButtonsDisabled = timeElapsedInSeconds > 0

    return (
      <div className="main-container">
        <div className="bg-container">
          <h1 className="heading">Digital Timer</h1>
          <div className="timer-container ">
            <div className="image-container">
              <div className="stop-watch-container">
                <p className="time-text">
                  {this.getElapsedSecondsInTimeFormat()}
                </p>
                <p className="text-paused-running">{pauseAndRunning}</p>
              </div>
            </div>
            <div className="start-reset-container">
              <div className="start-reset">
                <div className="start-container">
                  <button
                    type="button"
                    className="button-start"
                    onClick={this.startAndPauseTimer}
                  >
                    <img
                      className="start-reset-image"
                      src={imageStartAndPause}
                      alt="play icon"
                    />
                  </button>
                  <p className="start-reset-text">{startAndPause}</p>
                </div>
                <div className="reset-container">
                  <button
                    type="button"
                    className="button-start"
                    onClick={this.getResetTimer}
                  >
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                      alt="reset icon"
                      className="start-reset-image"
                    />
                  </button>

                  <p className="start-reset-text">Reset</p>
                </div>
              </div>
              <div className="set-timer-container">
                <p className="set-timer-text">Set Timer limit</p>
                <div className="buttons-container">
                  <button
                    type="button"
                    className="button"
                    disabled={isButtonsDisabled}
                    onClick={this.substractOnTimer}
                  >
                    -
                  </button>
                  <p className="timer-text">{timer}</p>
                  <button
                    type="button"
                    className="button"
                    onClick={this.addingOnTimer}
                    disabled={isButtonsDisabled}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
