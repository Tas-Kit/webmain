import React from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';

const styles = () => ({
  textField: {
    width: 160,
  },
});

const OptionsSelect = ({
  options,
  selectFieldName,
  onChange,
  classes,
  allowNone,
  label,
}) => (
  <TextField
    select
    id="options_selector"
    value={selectFieldName}
    label={label}
    className={classes.textField}
    onChange={onChange}
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

export default withStyles(styles)(OptionsSelect);
