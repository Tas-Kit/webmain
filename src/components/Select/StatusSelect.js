import React from 'react';
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';
import { STATUS } from '../../constants';

const StatusSelect = ({ status, onChange }) => (
  <Select value={status} onChange={onChange('status')}>
    {STATUS.map(value => <MenuItem key={value} value={value}>{value}</MenuItem>)}
  </Select>
);

export default StatusSelect;
