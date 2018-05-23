import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import InvitationStatusContainer from '../containers/InvitationStatusContainer';
import { LoadingButton } from './Button';


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


const Invitation = (props) => {
  const {
    usernameToInvite,
    handleUsernameToInviteChange,
    handleInvitationClick,
    isLoading,
    classes,
  } = props;

  return (
    <div>
      <div className={classes.flexContainer}>
        <TextField
          className={classes.usernameTextfield}
          id="username"
          label="Username"
          value={usernameToInvite}
          onChange={handleUsernameToInviteChange}
          fullWidth
        />
        <LoadingButton
          loading={isLoading}
          buttonName="Invite"
          onClick={handleInvitationClick}
          color="primary"
        />
      </div>
      <InvitationStatusContainer />
    </div>
  );
};

export default withStyles(styles)(Invitation);
