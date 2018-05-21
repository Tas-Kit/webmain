import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';

const TaskitCheckbox = (props) => {
  const inline = {
    box: {
      top: 2,
    },
  };
  const { checked, onChange, selectFieldName } = props;
  return (
    <Checkbox
      style={inline.box}
      checked={checked}
      onChange={onChange}
      value={selectFieldName}
      color="primary"
    />
  );
};

export default TaskitCheckbox;
