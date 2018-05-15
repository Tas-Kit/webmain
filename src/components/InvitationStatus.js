import React from 'react';
import InvitationStatusRow from './InvitationStatusRow';

const InvitationStatus = props => {
  const {
    users, roles, handleRevokeInvitationClick, handleSuperRoleChange, handleRoleChange,
  } = props;
  return (
    <div>
      {
        Object.keys(users).map(id => {
          const user = users[id];
          return (<InvitationStatusRow
            user={user}
            userId={id}
            roles={roles}
            handleRevokeInvitationClick={handleRevokeInvitationClick}
            handleSuperRoleChange={handleSuperRoleChange}
            handleRoleChange={handleRoleChange}
          />);
        })
      }
    </div>
  );
};

export default InvitationStatus;
