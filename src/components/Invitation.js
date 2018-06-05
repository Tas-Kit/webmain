import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Input } from '@material-ui/core';
import InvitationStatusContainer from '../containers/InvitationStatusContainer';
import { LoadingButton } from './Button';
import { FormattedMessage } from 'react-intl';


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
        <Input
          className={classes.usernameTextfield}
          id="username"
          placeholder="username"
          value={usernameToInvite}
          onChange={handleUsernameToInviteChange}
          fullWidth
        />
        <LoadingButton
          loading={isLoading}
          buttonName={<FormattedMessage id="inviteButton" defaultMessage="Invite" />}
          className="invite"
          onClick={handleInvitationClick}
          color="primary"
        />
      </div>
      <InvitationStatusContainer />
    </div>
  );
};

export default withStyles(styles)(Invitation);
