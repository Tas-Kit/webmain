import React from 'react';
import TextField from 'material-ui/TextField';
import { MenuItem } from 'material-ui/Menu';

const OptionsSelect = ({ options, selectFieldName, onChange, width, allowNone, label }) => (
  <TextField
    select
    id="options_selector"
    value={selectFieldName}
    label={label}
    onChange={onChange}
    style={{ width }}
  >
    {allowNone ? <MenuItem key="" value="" /> : null}
    {options.map(unit => (
      <MenuItem key={unit} value={unit}>
        {unit}
      </MenuItem>
    ))}
  </TextField>
);

OptionsSelect.defaultProps = {
  width: 150,
  allowNone: false,
  label: '',
};

export default OptionsSelect;
