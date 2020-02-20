import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import './index.less';

class SnapShot extends PureComponent {
  state = {
    messages: [],
    amount: 0
  };
  handleNewMessage(num) {
    this.setState(prev => {
      // 第一次就messages就增加了一个元素 `msg 0` 
      return { messages: [`msg ${prev.messages.length}`, ...prev.messages], amount: num ? prev.amount + 1 : prev.amount}
    })
  }
  componentDidMount() {
    for (let i = 0; i < 20; i++) this.handleNewMessage();
    this.timerId = window.setInterval(() => {
      if (this.state.messages.length > 30) {
        window.clearInterval(this.interval);
        return;
      }
      this.handleNewMessage(1);
    }, 1000)
  }
  componentWillUnmount() {
    window.clearInterval(this.interval);
  }
  getSnapshotBeforeUpdate() {
    return this.rootNode.scrollHeight
  }
  componentDidUpdate(prevProps, prevState, prevScrollHeight) {
    const scrollTop = this.rootNode.scrollTop;
    if (scrollTop < 5) return; // 用户在划到最顶端的时候 滚动条不能动
    this.rootNode.scrollTop = 
      scrollTop + (this.rootNode.scrollHeight - prevScrollHeight)
  }
  render() {
    return (
      <div className="snap-shot" ref={(n) => this.rootNode = n}>
        {this.state.messages.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
        <div className="snap-pop">有{this.state.amount}条消息</div>
      </div>
    )
  }
}

ReactDOM.render(
  <SnapShot />,
  document.getElementById('root')
)