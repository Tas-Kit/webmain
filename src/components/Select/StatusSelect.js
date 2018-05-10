import React from 'react';
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';

// hard coded for now, later take data from api response
const statuses = ['New', 'Status1', 'Status2'];

const StatusSelect = ({ status, onChange }) => (
  <Select
    value={status}
    onChange={onChange('status')}
  >
    {statuses.map(value => <MenuItem key={value} value={value}>{value}</MenuItem>)}
  </Select>
);

export default StatusSelect;
