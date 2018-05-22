import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { withStyles } from '@material-ui/core';
import { GREY } from '../../constants/colors';

const styles = {
  main: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1em',
  },
  button: {
    color: GREY,
    float: 'right',
  },
  addIcon: {
    width: 20,
    height: 20,
  },
};

const BottomPanel = (props) => {
  const { handleAddTask, handleLogoutClick, classes } = props;

  return (
    <div className={classes.main}>
      {/* Logout */}
      <Button
        variant="raised"
        color="secondary"
        onClick={handleLogoutClick}
      >
        Logout
      </Button>
      {/* Add Task Button */}
      <Link to="/">
        <Button
          mini
          variant="fab"
          className={classes.button}
          onClick={handleAddTask}
          color="primary"
        >
          <AddIcon className={classes.addIcon} />
        </Button>
      </Link>
    </div>
  );
};

export default withStyles(styles)(BottomPanel);
