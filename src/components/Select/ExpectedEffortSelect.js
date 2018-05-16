import React from 'react';
import Validator from 'validatorjs';
import TextField from 'material-ui/TextField';
import { MenuItem } from 'material-ui/Menu';
import { FormControl, FormHelperText } from 'material-ui/Form';
import { TIME_UNITS } from '../../constants';

const ExpectedEffortSelect = (props) => {
  const renderTimeFieldErrorText = () => {
    const { time, validationRule, errorMessage, timeUnit } = props;
    const data = { time };
    const rules = { time: validationRule };
    const validator = new Validator(data, rules);
    if (time === '' && timeUnit !== '') {
      return (
        <FormHelperText id="time-error" error>
          Please specify a number.
        </FormHelperText>
      );
    } else if (validator.fails()) {
      return (
        <FormHelperText id="time-error" error>
          {errorMessage}
        </FormHelperText>
      );
    }
  };

  const renderUnitFieldErrorText = () => {
    const timeValue = props.time.trim();
    if (timeValue !== '' && props.timeUnit === '') {
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
