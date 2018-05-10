import React from 'react';
import TextField from 'material-ui/TextField';
import { MenuItem } from 'material-ui/Menu';

const timeUnits = ['Second', 'Minute', 'Hour', 'Day', 'Week', 'Month', 'Year'];

const TimeUnitSelect = ({ timeUnit, onChange }) => (
  <TextField
    select
    id="expected_effort"
    value={timeUnit}
    label="Unit"
    onChange={onChange('timeUnit')}
    style={{ marginLeft: 10, width: 150 }}
  >
    {timeUnits.map(unit => (
      <MenuItem key={unit} value={unit}>
        {`${unit}(s)`}
      </MenuItem>
    ))}
  </TextField>
);

export default TimeUnitSelect;
