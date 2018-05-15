import React from 'react';
import TextField from 'material-ui/TextField';
import { MenuItem } from 'material-ui/Menu';
import { FormControl, FormHelperText } from 'material-ui/Form';
import { TIME_UNITS } from '../../constants';

const ExpectedEffortSelect = (props) => {
  const renderTimeFieldErrorText = () => {
    let error = false;
    if (Number.isNaN(props.time)) {
      error = true;
    } else if (!Number.isInteger(parseFloat(props.time))) {
      error = true;
    }
    return (
      error ?
        <FormHelperText id="time-error" error>
          Time value expects an integer.
        </FormHelperText>
        :
        null
    );
  };
  return (
    <div style={{ display: 'inline-block' }}>
      <FormControl>
        <TextField
          id="time"
          value={props.time}
          label="Number"
          onChange={props.onChangeTime}
          style={{ width: 150 }}
        />
        {renderTimeFieldErrorText()}
      </FormControl>
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
};

export default ExpectedEffortSelect;
