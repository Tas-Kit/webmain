import React from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const getDefaultValue = (data) => {
  const { values, valueRange } = data;
  if (values) return values[0];
  return valueRange.min;
}

class PickList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: getDefaultValue(props.data)
    };
  }

  renderOptions = () => {
    const { data } = this.props;
    const { values, valueRange, displayFunc } = data;
    if (values) return values.map(value => (
      <MenuItem value={value}>{displayFunc(value)}</MenuItem>
    ))

    const { min, max, interval } = valueRange;
    const valueArray = [];
    for (let i = min; i <= max; i += interval) {
      valueArray.push(i);
    }

    return valueArray.map(value => (
      <MenuItem value={value}>{displayFunc(value)}</MenuItem>
    ))
  }

  handleValueChange = (e) => {
    this.setState({ value: e.target.value });
  }

  render() {
    const { value } = this.state;
    return (
      <Select
        value={value}
        style={{ width: 120, marginTop: 20, marginBottom: 20 }}
        autoWidth
        onChange={this.handleValueChange}
      >
        {this.renderOptions()}
      </Select>
    );
  }
}

export default PickList;
