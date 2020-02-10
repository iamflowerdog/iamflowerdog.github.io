
import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'antd';
import { helloworld } from './helloworld';
// import '../../common/common';
import './index.less';

class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      greeting: '登陆'
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick () {
    console.log(this);
    window.location.href = './home.html';
  }
  render() {
    return (
      <div className="search-text" >
        <Button type="primary" onClick={this.handleClick}>{this.state.greeting}</Button>
        <Button>{helloworld()}</Button>
      </div>
    )
  }
}

ReactDOM.render(
  <App/>,
  document.getElementById('root')
)