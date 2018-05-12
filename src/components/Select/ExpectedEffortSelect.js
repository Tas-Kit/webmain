import React from 'react';
import TextField from 'material-ui/TextField';
import { MenuItem } from 'material-ui/Menu';
import { TIME_UNITS } from '../../constants';

const ExpectedEffortSelect = props => (
  <div style={{ display: 'inline-block' }}>
    <TextField
      id="time"
      value={props.time}
      label="Number"
      onChange={props.onChangeTime}
      style={{ width: 150 }}
    />
    <TextField
      select
      id="expected_effort"
      value={props.timeUnit}
      label="Unit"
      onChange={props.onChangeUnit}
      style={{ marginLeft: 10, width: 150 }}
    >
      {TIME_UNITS.map(unit => (
        <MenuItem key={unit} value={unit}>
          {`${unit}(s)`}
        </MenuItem>
      ))}
    </TextField>
  </div>
);

export default ExpectedEffortSelect;
