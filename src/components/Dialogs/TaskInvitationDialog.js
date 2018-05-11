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
};


const TaskInvitationDialog = props => {
  const {
    open, onClose, classes, users, handleRevokeInvitationClick,
  } = props;
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
    >
      <div className={classes.flexContainer}>
        <DialogTitle className={classes.flex} id="task-invitation-dialog-title">Invitation</DialogTitle>
        <IconButton onClick={onClose}>
          <Close />
        </IconButton>
      </div>
      <DialogContent>
        <TextField id="username" label="Username" fullWidth />
        {Object.keys(users).map(id => {
          const user = users[id];
          return (<UserStatusRow {...user} handleRevokeInvitationClick={handleRevokeInvitationClick} />);
        })}
      </DialogContent>
    </Dialog>
  );
};

export default withStyles(styles)(TaskInvitationDialog);
