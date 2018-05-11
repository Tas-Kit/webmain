import React from 'react';

import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import { withStyles, Avatar } from 'material-ui';
import Button from 'material-ui/Button';
import SupervisorAccount from '@material-ui/icons/SupervisorAccount';


const styles = {
  taskToolBar: {
    boxSizing: 'border-box',
    border: 'solid #979797 1px',
    background: 'white',
  },
  flex: {
    flex: 1,
  },
  letterAvatar: {
    width: 31,
    height: 31,
    fontSize: 16,
  },
  buttonGroup: {},
};

const TaskToolbar = props => {
  const { classes, users = ['YZ'], handleInvitationClick } = props;
  return (
    <Toolbar className={classes.taskToolBar}>
      <div className={classes.flex}>
        <Button key="info">Info</Button>
        <Button key="clone">Clone</Button>
        <Button key="save">Save</Button>
      </div>
      {Object.keys(users).map(id => {
        const user = users[id];
        return (
          <Avatar key={id} className={classes.letterAvatar}>
            {`${user.basic.first_name[0]}${
              user.basic.last_name[0]
              }`}
          </Avatar>
        );
      })}
      <IconButton onClick={handleInvitationClick} color="inherit" aria-label="Invitation">
        <SupervisorAccount />
      </IconButton>
    </Toolbar>
  );
};

export default withStyles(styles)(TaskToolbar);
