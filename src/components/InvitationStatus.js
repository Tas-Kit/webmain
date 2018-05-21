import React from 'react';
import InvitationStatusRow from './InvitationStatusRow';

const InvitationStatus = (props) => {
  const {
    users, roles, userPermission, handleRevokeInvitationClick,
    handleSuperRoleChange, handleRoleChange,
  } = props;
  return (
    <div>
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

export default InvitationStatus;
