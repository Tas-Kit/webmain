import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'material-ui/Button';
import AddIcon from '@material-ui/icons/Add';
import { GREY } from '../../constants/colors';

const inline = {
  main: {
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
    <Link to="/">
      <Button mini variant="fab" style={inline.button} onClick={props.toggleTaskInfo} color="primary" >
        <AddIcon style={inline.addIcon} />
      </Button>
    </Link>
  </div>
);

export default BottomPanel;
