import React from 'react';
import ReactDOM from 'react-dom';
import CommentList from "./CommentList";
import CommentForm from "./CommentForm";
import "./index.less";

const comments = [
  {
    author: "Nate",
    content: "Hello React! This is a sample comment.",
  },
  { author: "Kevin", content: "Hello Redux!" },
  { author: "Bood", content: "Hello Rekit!" },
];

export class CommentBox extends React.PureComponent {
  state = {
    comment: '123'
  }
  render() {
    return (
      <div className="comment-box">
        <h1>Comments ({comments.length})</h1>
        <CommentList comments={comments} />
        <CommentForm comment={this.state.comment} />
      </div>
    );
  }
}


ReactDOM.render(
  <CommentBox />,
  document.getElementById('root')
)