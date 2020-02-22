import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import './index.less';

function createComponent(name) {
  class _MyNode extends React.Component {
    constructor(props) {
      super(props);
      console.log(name + ' is created.');
    }
    componentDidMount() {
      console.log(name + ' did mount.');
    }

    componentWillUnmount() {
      console.log(name + ' will unmount.');
    }

    componentDidUpdate() {
      console.log(name + ' is updated.');
    }

    render() {
      return (
        <div className={'node ' + name} data-name={name}>
          {this.props.children}
        </div>
      );
    }
  }
  return _MyNode;
}

var Root = createComponent('R');
var A = createComponent('A');
var B = createComponent('B');
var C = createComponent('C');
var D = createComponent('D');

class Wrapper extends React.Component {
  shape1 () {
    return (
      <Root>
        <A>
          <B />
          <C />
        </A>
        <D />
      </Root>
    );
  }

  shape2 () {
    return (
      <Root>
        <A>
          <B />
        </A>
        <D>
          <C />
        </D>
      </Root>
    );
  }

  shape3 () {
    return (
      <Root>
        <A>
          <B>
            <C />
          </B>
        </A>
        <D />
      </Root>
    );
  }

  shape4 () {
    return (
      <Root>
        <A>
          <B />
          <D>
            <C />
          </D>
        </A>
      </Root>
    );
  }

  shape5 () {
    return (
      <Root>
        <A>
          <B key="B" />
          <C key="C" />
        </A>
      </Root>
    );
  }

  shape6 () {
    return (
      <Root>
        <A>
          <C key="C" />
          <B key="B" />
        </A>
      </Root>
    );
  }

  render () {
    if (this[this.props.shape]) {
      return this[this.props.shape]();
    } else {
      return <Root />;
    }
  }
};

Wrapper.propTypes = {
  shape: PropTypes.string
}

class App extends React.Component {
  state = {
    shape: ''
  }
  myRender(shape) {
    this.setState({shape})
  }
  render() {
    return (
      <div id="react-root">
        <div>
          <button onClick={() => this.myRender('shape1')}>Shape 1</button>
          <button onClick={() => this.myRender('shape2')}>Shape 2</button>
          <button onClick={() => this.myRender('shape3')}>Shape 3</button>
          <button onClick={() => this.myRender('shape4')}>Shape 3</button>
          <button onClick={() => this.myRender('shape5')}>Shape 3</button>
          <button onClick={() => this.myRender('shape6')}>Shape 3</button>
          <a href="https://sprit.vip" style={{marginLeft: "20px", fontSize: "12px", color: "red"}}>Fork me</a>
        </div>
        <Wrapper shape={this.state.shape} />
      </div>
    )
  }
}

ReactDOM.render(
  <App/>,
  document.getElementById('root')
)