import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Input } from '@material-ui/core';
import { FormattedMessage } from 'react-intl';
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
        <Input
          className={classes.usernameTextfield}
          id="username"
          placeholder={<FormattedMessage id="usernameFieldPlaceholder" />}
          value={usernameToInvite}
          onChange={handleUsernameToInviteChange}
          fullWidth
          disabled={isLoading}
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
