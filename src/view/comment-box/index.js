import React from 'react';
import ReactDOM from 'react-dom';

import './index.less';

class CommentBox extends React.Component {
  render() {
    return (
      <div>
        <h1>Comments </h1>
      </div>
    )
  }
}


ReactDOM.render(
  <CommentBox />,
  document.getElementById('root')
)