import React from 'react';
import Button from 'material-ui/Button';
import AddIcon from '@material-ui/icons/Add';
import { GREY } from '../../constants/colors';

const inline = {
  main: {
    position: 'absolute',
    width: '100%',
    bottom: 10,
  },
  button: {
    color: GREY,
    float: 'right',
    margin: '10px 20px',
  },
  addIcon: {
    width: 20,
    height: 20,
  },
};

const BottomPanel = props => (
  <div style={inline.main}>
    {/* Add Task Button */}
    <Button mini variant="fab" style={inline.button} onClick={props.toggleFormDialog} color="primary" >
      <AddIcon style={inline.addIcon} />
    </Button>
  </div>
);

export default BottomPanel;
