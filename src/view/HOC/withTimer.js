import React from "react";

export default function withTimer(WrappedComponent) {
  return class extends React.Component {
    state = { time: new Date() };
    componentDidMount() {
      this.timeID = setInterval(() => this.tick(), 1000);
    }

    componentWillUnmount() {
      clearInterval(this.timeID);
    }

    tick() {
      this.setState({
        time: new Date()
      })
    }

    render() {
      return <WrappedComponent time={this.state.time} {...this.props}/>
    }
  }
}