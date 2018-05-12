import React from 'react';
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';

const OptionsSelect = ({ options, selectFieldName, onChange }) => (
  <Select value={selectFieldName} onChange={onChange}>
    {options.map(value => <MenuItem key={value} value={value}>{value}</MenuItem>)}
  </Select>
);

export default OptionsSelect;
