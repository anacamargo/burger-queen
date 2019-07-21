import React from 'react';

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      initial: props.timeStamp,
      elapsed: "",
      class: 'text-success'
    }
  }

  componentDidMount(){
    this.interval = setInterval(() => {
      const elapsedTime = this.calcElapsed();
      this.setState({ 
        elapsed : elapsedTime.formated, 
        class : this.chooseColor(elapsedTime.hours, elapsedTime.minutes) 
      });
    }, 1000);
  }

  calcElapsed(){
    const datetime = new Date(Date.now() - this.state.initial);
    const seconds = (Date.now() - this.state.initial) / 1000; 
    return {
      formated : datetime.toISOString().substr(11, 8),
      hours : Math.floor(seconds / 3600),
      minutes : Math.floor((seconds % 3600) / 60)
    } 
  }

  chooseColor(hours, minutes){
    if(hours <= 0){
      if(minutes < 10) return 'text-success';
      if(minutes >= 10 && minutes < 20) return 'text-warning';
      if(minutes > 20) return 'text-danger';
    }
    else return 'text-danger';
  }

  render() {
    const classes = 'fas fa-stopwatch ' + this.state.class;
    return(
      <i className={classes}>{this.state.elapsed}</i>
    )
  }

  componentWillUnmount(){
    clearInterval(this.interval);
  }

}
export default Timer;