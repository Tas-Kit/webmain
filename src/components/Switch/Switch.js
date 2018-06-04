import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MUISwitch from '@material-ui/core/Switch';

const Switch = (props) => {
  const { label, checked, onChange } = props;
  return (
    <FormControlLabel
      control={<MUISwitch checked={checked} onChange={onChange} color="primary" />}
      label={label}
    />
  );
};

export default Switch;
