import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classNames from 'classnames';

import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import { withStyles, Avatar } from 'material-ui';
import Button from 'material-ui/Button';

import SupervisorAccount from '@material-ui/icons/SupervisorAccount';

import * as dialogActions from '../actions/dialogActions';

import { THIRD, TRANSPARENT_THIRD } from '../constants/colors';

const styles = {
  flex: {
    flex: 1,
  },
  letterAvatar: {
    width: 31,
    height: 31,
    fontSize: 16,
  },
  button: {
    color: THIRD,
    '&:hover': {
      backgroundColor: TRANSPARENT_THIRD,
    },
  },
};

const TaskToolbar = (props) => {
  const { classes, users = ['YZ'] } = props;
  const { toggleTaskInfo } = props.actions;
  return (
    <Toolbar>
      <div className={classes.flex}>
        <Button key="info" color="primary" onClick={toggleTaskInfo}>Info</Button>
        <Button key="clone" color="secondary">Clone</Button>
        <Button key="save" className={classNames(classes.button)}>Save</Button>
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

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(dialogActions, dispatch),
});

export default connect(null, mapDispatchToProps)(withStyles(styles)(TaskToolbar));
