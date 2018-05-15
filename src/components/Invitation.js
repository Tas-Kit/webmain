import React from 'react';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import Close from '@material-ui/icons/Close';
import TextField from 'material-ui/TextField';
import { withStyles } from 'material-ui/styles';
import InvitationStatusContainer from "../containers/InvitationStatusContainer";


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


const Invitation = props => {
  const {
    usernameToInvite, handleUsernameToInviteChange, handleInvitationClick, classes,
  } = props;

  return (
    <div>
      <div className={classes.flexContainer}>
        <TextField className={classes.usernameTextfield} id="username" label="Username" value={usernameToInvite} onChange={handleUsernameToInviteChange} fullWidth />
        <Button variant="raised" color="primary" onClick={handleInvitationClick}>Invite</Button>
      </div>
      <InvitationStatusContainer />
    </div>
  );
};

export default withStyles(styles)(Invitation);
