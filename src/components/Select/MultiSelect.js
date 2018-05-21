import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import Chip from '@material-ui/core/Chip';
import MenuItem from '@material-ui/core/MenuItem';

const styles = theme => ({
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: theme.spacing.unit / 4,
  },
});

const MultiSelect = (props) => {
  const {
    classes,
    options,
    selectFieldName,
    onChange,
  } = props;
  return (
    <Select
      multiple
      value={selectFieldName}
      onChange={onChange}
      input={<Input id="select-multiple-chip" />}
      renderValue={selected => (
        <div className={classes.chips}>
          {selected.map(value => <Chip key={value} label={value} className={classes.chip} />)}
        </div>
      )}
    >
      {options.map(option => (
        <MenuItem key={option} value={option}>
          {option}
        </MenuItem>
      ))}
    </Select>
  );
};

export default withStyles(styles, { withTheme: true })(MultiSelect);
