import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MUISwitch from '@material-ui/core/Switch';

const Switch = (props) => {
  const { label, editMode, onToggle } = props;
  return (
    <FormControlLabel
      control={<MUISwitch checked={editMode} onChange={onToggle} color="primary" />}
      label={label}
    />
  );
};

export default Switch;
