import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Clock extends Component {
  constructor(props) {
    super(props);
    console.log('类的构造函数');
    this.state = { time: new Date() }
  }
  componentDidMount() {
    console.log('mount');
    this.timerId = setInterval(() => this.tick(), 1000)
  }
  componentWillUnmount() {
    clearInterval(this.timerId);
    console.log('组件销毁');
  }
  componentDidUpdate() {
    console.log('更新', this.timerId);
  }
  tick() {
    this.setState({
      time: new Date()
    })
  }
  render() {
    return (
      <div>
        {this.state.time.toLocaleTimeString()}
      </div>
    )
  }
}

ReactDOM.render(
  <Clock/>,
  document.getElementById('root')
)