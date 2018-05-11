import React from 'react';
import Dialog, { DialogActions, DialogContent, DialogContentText, DialogTitle } from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import Close from '@material-ui/icons/Close';
import TextField from 'material-ui/TextField';
import { withStyles } from 'material-ui/styles';

const styles = {
  flexContainer: {
    display: 'flex',
    alignItems: 'center',
    padding: '0.5rem',
  },
  flex: {
    flex: 1,
  },
};


const TaskInvitationDialog = props => {
  const { open, onClose, classes } = props;
  return (
    <Dialog
      className={classes.invitationDialog}
      open={open}
      onClose={onClose}
    >
      <div className={classes.flexContainer}>
        <DialogTitle className={classes.flex} id="task-invitation-dialog-title">Invitation</DialogTitle>
        <IconButton onClick={onClose}>
          <Close />
        </IconButton>
      </div>

    </Dialog>
  );
};

export default withStyles(styles)(TaskInvitationDialog);
