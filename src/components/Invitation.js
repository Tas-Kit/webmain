import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';
import { FormattedMessage } from 'react-intl';
import InvitationStatusContainer from '../containers/InvitationStatusContainer';
import { LoadingButton } from './Button';
import { TEXT_FIELD_TITLE } from '../constants';


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
    display: 'felx',
    marginRight: '0.5em',
  },
  closeButton: {
    marginRight: '0.5em',
  },
  fieldName: {
    position: 'relative',
    top: 3,
    marginRight: 10,
    marginLeft: '0.5em',
    fontSize: TEXT_FIELD_TITLE,
    fontWeight: 500,
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
        <span className={classes.fieldName} ><FormattedMessage id="usernameFieldPlaceholder" />:</span>
        <TextField
          className={classes.usernameTextfield}
          id="username"
          value={usernameToInvite}
          onChange={handleUsernameToInviteChange}
          disabled={isLoading}
          fullWidth
        />
        <LoadingButton
          loading={isLoading}
          buttonName={<FormattedMessage id="inviteButton" defaultMessage="Invite" />}
          className="invite"
          onClick={handleInvitationClick}
          color="primary"
          variant="flat"
        />
      </div>
      <InvitationStatusContainer />
    </div>
  );
};

export default withStyles(styles)(Invitation);
