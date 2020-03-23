import React, { PureComponent } from "react";
import ReactDOM from 'react-dom';
import PropTypes from "prop-types";
import "./index.less";

export default class TabSelector extends PureComponent {
  static propTypes = {
    value: PropTypes.string,
    options: PropTypes.array,
    onChange: PropTypes.func
  };

  static defaultProps = {
    value: null,
    options: [],
    onChange: () => { }
  };
  render() {
    const { options, value, onChange } = this.props;
    return (
      <div className="tab-selector">
        <ul>
          {options.map(opt => (
            <li
              key={opt.value}
              className={`tab-item ${
                opt.value === value
                ? `selected ${opt.value}`
                  : ""
                }`}
              onClick={() => onChange(opt.value)}
            >
              {opt.name}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

const options = [
  { name: "Red", value: "red" },
  { name: "Blue", value: "blue" },
  { name: "Orange", value: "orange" }
];

export class TabSelectorSample extends PureComponent {
  state = {
    color: null
  };
  render() {
    return (
      <div>
        Select color:{" "}
        <TabSelector
          options={options}
          value={this.state.color}
          onChange={c => this.setState({ color: c })}
        />
      </div>
    );
  }
}

ReactDOM.render(
  <TabSelectorSample />,
  document.getElementById('root')
)