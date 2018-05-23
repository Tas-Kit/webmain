import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import { PowerSettingsNew } from '@material-ui/icons';
import { withStyles } from '@material-ui/core';
import { WHITE } from '../../constants/colors';

const styles = {
  main: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1em',
  },
  button: {
    color: WHITE,
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
      <IconButton
        aria-label="Accept"
        color="secondary"
        onClick={handleLogoutClick}
      >
        <PowerSettingsNew />
      </IconButton>
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
