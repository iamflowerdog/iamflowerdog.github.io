
import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'antd';
// import '../../common/common';
import './index.less';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      greeting: '登陆'
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    console.log(this);
    window.location.href= '/home.html';
  }
  render() {
    return (
      <div className="search-text" >
        <Button type="primary" onClick={this.handleClick}>{this.state.greeting}</Button>
        <Button>{this.state.greeting}</Button>
      </div>
    )
  }
}

ReactDOM.render(
  <Home />,
  document.getElementById('root')
)