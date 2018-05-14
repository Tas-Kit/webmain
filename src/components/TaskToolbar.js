import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import { withStyles, Avatar } from 'material-ui';
import Button from 'material-ui/Button';

import SupervisorAccount from '@material-ui/icons/SupervisorAccount';

import * as dialogActions from '../actions/dialogActions';

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
  const { classes, users = ['YZ'] } = props;
  const { toggleTaskInfo, toggleInvitation } = props.actions;
  return (
    <Toolbar className={classes.taskToolBar}>
      <div className={classes.flex}>
        <Button key="info" onClick={toggleTaskInfo}>Info</Button>
        <Button key="clone">Clone</Button>
        <Button key="save">Save</Button>
      </div>
      {Object.keys(users).map(id => {
        const user = users[id];
        return (
          <Avatar key={id} className={classes.letterAvatar}>
            {`${user.basic.username[0]}`}
          </Avatar>
        );
      })}
      <IconButton color="inherit" aria-label="Invitation" onClick={toggleInvitation} >
        <SupervisorAccount />
      </IconButton>
    </Toolbar>
  );
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(dialogActions, dispatch),
});

export default connect(null, mapDispatchToProps)(withStyles(styles)(TaskToolbar));
