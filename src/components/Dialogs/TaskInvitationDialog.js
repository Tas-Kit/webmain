import React from 'react';
import Dialog, { DialogActions, DialogContent, DialogContentText, DialogTitle } from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import Close from '@material-ui/icons/Close';
import TextField from 'material-ui/TextField';
import { withStyles } from 'material-ui/styles';

import UserStatusRow from '../Dialogs/UserStatusRow';

const styles = {
  flexContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  flex: {
    flex: 1,
  },
  usernameTextfield: {
    flex: 1,
    marginRight: '0.5em',
  },
  closeButton: {
    marginRight: '0.5em',
  },
};


const TaskInvitationDialog = props => {
  const {
    open, onClose, roles, classes, users, handleRevokeInvitationClick, handleInvitationClick, handleSuperRoleChange, handleRoleChange,
  } = props;

  console.log(users);
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
    >
      <div className={classes.flexContainer}>
        <DialogTitle className={classes.flex} id="task-invitation-dialog-title">Invitation</DialogTitle>
        <IconButton className={classes.closeButton} onClick={onClose}>
          <Close />
        </IconButton>
      </div>
      <DialogContent>
        <div className={classes.flexContainer}>
          <TextField className={classes.usernameTextfield} id="username" label="Username" fullWidth />
          <Button variant="raised" color="primary" onClick={handleInvitationClick}>Invite</Button>
        </div>
        {Object.keys(users).map(id => {
          const user = users[id];
          return (<UserStatusRow
            username={user.basic.username}
            role={user.has_task.role}
            superole={user.has_task.super_role}
            acceptance={user.has_task.acceptance}
            userId={id}
            roles={roles}
            handleRevokeInvitationClick={handleRevokeInvitationClick}
            handleSuperRoleChange={handleSuperRoleChange}
            handleRoleChange={handleRoleChange}
          />);
        })}
      </DialogContent>
    </Dialog>
  );
};

export default withStyles(styles)(TaskInvitationDialog);
