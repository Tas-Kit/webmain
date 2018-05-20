import React from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import { TIME_UNITS } from '../../constants';

const ExpectedEffortSelect = (props) => {
  const renderTimeFieldErrorText = () => {
    const { time, timeUnit } = props;
    if (time === '' && timeUnit !== '') {
      return (
        <FormHelperText id="time-error" error>
          Please specify a number.
        </FormHelperText>
      );
    }
    return null;
  };

  const renderUnitFieldErrorText = () => {
    const { time, timeUnit } = props;
    if (time !== '' && timeUnit === '') {
      return (
        <FormHelperText id="unit-error" error>
          Pleas select a unit.
        </FormHelperText>
      );
    }
    return null;
  };

  return (
    <div style={{ display: 'inline-block' }}>
      <FormControl style={{ width: 150 }}>
        <TextField
          id="time"
          value={props.time}
          label="Number"
          type="number"
          inputProps={{ min: 0.01 }}
          onChange={props.onChangeTime}
        />
        {renderTimeFieldErrorText()}
      </FormControl>
      <FormControl style={{ marginLeft: 10, width: 150 }}>
        <TextField
          select
          id="expected_effort"
          value={props.timeUnit}
          label="Unit"
          onChange={props.onChangeUnit}
        >
          {[
            <MenuItem key="" value="" />,
            ...TIME_UNITS.map(unit => (
              <MenuItem key={unit} value={unit}>
                {`${unit}(s)`}
              </MenuItem>
            )),
          ]}
        </TextField>
        {renderUnitFieldErrorText()}
      </FormControl>
    </div>
  );
};

export default ExpectedEffortSelect;
