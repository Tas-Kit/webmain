import React from 'react';
import TextField from 'material-ui/TextField';
import { MenuItem } from 'material-ui/Menu';
import { TIME_UNITS } from '../../constants';

const ExpectedEffortSelect = ({ time, timeUnit, onChange }) => (
  <div style={{ display: 'inline-block' }}>
    <TextField
      id="time"
      value={time}
      label="Number"
      onChange={onChange('time')}
      style={{ width: 150 }}
    />
    <TextField
      select
      id="expected_effort"
      value={timeUnit}
      label="Unit"
      onChange={onChange('timeUnit')}
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
