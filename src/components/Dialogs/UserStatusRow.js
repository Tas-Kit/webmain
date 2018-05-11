import React from 'react';
import Grid from 'material-ui/Grid';
import IconButton from 'material-ui/IconButton';
import Close from '@material-ui/icons/Close';

const UserStatusRow = props => {
  const {
    username, superole, role, acceptance, userId, handleRevokeInvitationClick,
  } = props;

  return (
    <Grid container>
      <Grid item cs={3}>
        {username}
      </Grid>
      <Grid item cs={3}>
        {superole}
      </Grid>
      <Grid item cs={3}>
        {role}
      </Grid>
      <Grid item cs={2}>
        {acceptance}
      </Grid>
      <Grid item cs={1}>
        <IconButton onClick={handleRevokeInvitationClick(userId)}>
          <Close />
        </IconButton>
      </Grid>
    </Grid>);
};

export default UserStatusRow;