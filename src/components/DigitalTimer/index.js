import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {timer: 25, isRunning: false, timerRunningStatus: ''}

  setTimeIntervalFun = () => {
    setInterval(() => {
      this.setState(prevState => ({timer: prevState.timer - 1}))
    }, 1000)
  }

  clearIntervalFun = () => {
    const {timerRunningStatus} = this.state
    clearInterval(timerRunningStatus)
  }

  getResetTimer = () => {
    this.setState({timer: 25})
  }

  addingOnTimer = () => {
    this.setState(prevState => ({timer: prevState.timer + 1}))
  }

  substractOnTimer = () => {
    this.setState(prevState => ({timer: prevState.timer - 1}))
  }

  startAndPauseTimer = () => {
    this.setState(prevState => ({isRunning: !prevState.isRunning}))
  }

  render() {
    const {timer, isRunning} = this.state
    const startAndPause = isRunning ? 'Pause' : 'Start'
    const imageStartAndPause = isRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    const pauseAndRunning = isRunning ? 'Running' : 'Paused'
    const runningStatus = isRunning
      ? this.setTimeIntervalFun()
      : this.clearIntervalFun()

    return (
      <div className="main-container">
        <div className="bg-container">
          <h1 className="heading">Digital Timer</h1>
          <div className="timer-container ">
            <div className="image-container">
              <div className="stop-watch-container">
                <p className="time-text">{runningStatus}</p>
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
                    onClick={this.substractOnTimer}
                  >
                    -
                  </button>
                  <p className="timer-text">{timer}</p>
                  <button
                    type="button"
                    className="button"
                    onClick={this.addingOnTimer}
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
