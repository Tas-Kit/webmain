import React from 'react';
import classNames from 'classnames';
import { withStyles, Avatar } from 'material-ui';

// ui components
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import Button from 'material-ui/Button';

// svgs
import SupervisorAccount from '@material-ui/icons/SupervisorAccount';

import {
  TEAL,
  ORANGE,
  TRANSPARENT_TEAL,
  TRANSPARENT_ORANGE,
} from '../constants/colors';

const styles = {
  flex: {
    flex: 1,
  },
  letterAvatar: {
    width: 31,
    height: 31,
    fontSize: 16,
  },
  saveBt: {
    color: TEAL,
    '&:hover': { backgroundColor: TRANSPARENT_TEAL },
  },
  cloneBt: {
    color: ORANGE,
    '&:hover': { backgroundColor: TRANSPARENT_ORANGE },
  },
};

const TaskToolbar = (props) => {
  const {
    classes,
    users = ['YZ'],
    toggleTaskInfo,
    toggleDeleteTask,
  } = props;

  return (
    <Toolbar>
      <div className={classes.flex}>
        <Button key="info" color="primary" onClick={toggleTaskInfo}>Info</Button>
        <Button
          key="clone"
          className={classNames(classes.cloneBt)}
        >
          Clone
        </Button>
        <Button key="save" className={classNames(classes.saveBt)}>Save</Button>
        <Button
          key="delete"
          color="secondary"
          onClick={toggleDeleteTask}
        >
          Delete
        </Button>
      </div>
      {Object.keys(users).map((id) => {
        const user = users[id];
        return (
          <Avatar key={id} className={classes.letterAvatar}>
            {`${user.basic.first_name[0]}${user.basic.last_name[0]}`}
          </Avatar>
        );
      })}
      <IconButton color="inherit" aria-label="Invitation">
        <SupervisorAccount />
      </IconButton>
    </Toolbar>
  );
};

export default withStyles(styles)(TaskToolbar);
