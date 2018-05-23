import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { WHITE } from '../../constants/colors';

const inline = {
  main: {
    width: '100%',
    bottom: 10,
  },
  button: {
    color: WHITE,
    float: 'right',
    margin: '10px 20px',
  },
  addIcon: {
    width: 20,
    height: 20,
  },
};

const BottomPanel = (props) => {
  const handleAddTask = () => {
    props.resetTaskInfo();
    props.toggleTaskCreator();
  };

  return (
    <div style={inline.main}>
      {/* Add Task Button */}
      <Link to="/">
        <Button mini variant="fab" style={inline.button} onClick={handleAddTask} color="primary" >
          <AddIcon style={inline.addIcon} />
        </Button>
      </Link>
    </div>
  );
};

export default BottomPanel;
