import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import ReactDOM from 'react-dom';

import '../tab-selector/index.less';

export class AdvancedSelector extends React.PureComponent {
  static propType = {
    value: PropTypes.string,
    options: PropTypes.array,
    onChange: PropTypes.func,
    children: PropTypes.func
  };

  static defaultProps = {
    value: null,
    options: [],
    onChange: () => {},
    children: () => {}
  };

  render() {
    const { options } = this.props;
    return (
      <div className="tab-selector">
        <ul>
          {options.map(opt => (
            <li
              key={opt.value}
              className={`tab-item ${
                opt.value === this.props.value ? "selected" : ""
              }`}
              onClick={() => this.props.onChange(opt.value)}
            >
              {opt.name}
            </li>
          ))}
        </ul>
        <br />
        <br />
        {this.props.value && this.props.children(this.props.value)}
      </div>
    )
  }
}

const colors = [
  { name: "Red", value: "red" },
  { name: "Blue", value: "blue" },
  { name: "Orange", value: "orange" }
];

const persons = [
  { name: "暖暖", value: "nuan" },
  { name: "妈妈", value: "mama" },
  { name: "爸爸", value: "papa" }
];

const animals = [
  { name: "Tiger", value: "tiger" },
  { name: "Elephant", value: "elephant" },
  { name: "Cow", value: "cow" }
];
class AdvancedTabSelectorSample extends PureComponent {
  state = {
    color: null,
    person: null,
    animal: null
  };
  render() {
    return (
      <div>
        <h3>Selected color:</h3>
        <AdvancedSelector
          options={colors}
          value={this.state.color}
          onChange={c => this.setState({color: c})}
        >
          {color => (
            <span
              style={{
                display: "inline-block",
                backgroundColor: color,
                width: "40px",
                height: "40px"
              }}
            />
          )}
        </AdvancedSelector>
        <br />
        <br />
        <br />
        <h3>Selected Person:</h3>
        <AdvancedSelector
          options={persons}
          value={this.state.person}
          onChange={p => this.setState({person: p})}
        >
          {person => (
            <img width="100px" src={require(`../../images/${person}.png`)} />
          )}
        </AdvancedSelector>
        <br />
        <br />
        <br />
        <h3>Selected Person:</h3>
        <AdvancedSelector
          options={animals}
          value={this.state.animal}
          onChange={p => this.setState({ animal: p })}
        >
          {animal => (
            <img width="100px" src={require(`../../images/${animal}.png`)} />
          )}
        </AdvancedSelector>
      </div>
    )
  }
}

ReactDOM.render(
  <AdvancedTabSelectorSample/>,
  document.getElementById('root')
)