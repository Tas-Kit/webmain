import React from 'react';
import { withStyles } from '@material-ui/core';
import InvitationStatusRow from './InvitationStatusRow';

const styles = {
  invitationStatusContainer: {
    marginTop: '0.5em',
  },
};

const InvitationStatus = (props) => {
  const {
    users, roles, userPermission, handleRevokeInvitationClick,
    handleSuperRoleChange, handleRoleChange, classes,
  } = props;
  return (
    <div className={classes.invitationStatusContainer}>
      {
        users.map(user => (<InvitationStatusRow
          key={user.has_task.id}
          user={user}
          roles={roles}
          userPermission={userPermission}
          handleRevokeInvitationClick={handleRevokeInvitationClick}
          handleSuperRoleChange={handleSuperRoleChange}
          handleRoleChange={handleRoleChange}
        />))
      }
    </div>
  );
};

export default withStyles(styles)(InvitationStatus);
