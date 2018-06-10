import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import InvitationStatus from '../components/InvitationStatus';
import * as taskActions from '../actions/taskActions';
import * as snackbarActions from '../actions/snackbarActions';
import { SUPER_ROLE } from '../constants';
import { revokeInvitation, changeUserSuperRole, changeUserRole } from '../utils/api';

class InvitationStatusContainer extends React.Component {
  //  TODO: Update locals users after sent invitation
  // TODO: Create another state in the reducer for invitation pending, name it sth.
  // else to differentiate between task pending and invitation pending and use it
  // in the ui so that the user can be aware that he's waiting for sth. to return.
  // -YIYANG

  hanldeRevokeInvitationClick = uid => () => {
    const {
      toggleInvitationStatusPending,
      updateMessage,
      removeUser,
    } = this.props.actions;
    const { taskId: tid } = this.props.taskManager;
    const payload = {
      uid,
    };
    toggleInvitationStatusPending();
    revokeInvitation(tid, payload)
      .then((success) => {
        if (success) {
          removeUser(uid);
          updateMessage('Invitation was revoked successfully');
        }
        toggleInvitationStatusPending();
      })
      .catch(() => {
        updateMessage('Revoke invitation failed');
        toggleInvitationStatusPending();
      });
  };

  handleSuperRoleChange = uid => (e) => {
    const {
      setUserSuperRole,
      updateMessage,
      toggleInvitationStatusPending,
    } = this.props.actions;
    const { taskId: tid, taskUsers } = this.props.taskManager;
    const payload = {
      uid,
      super_role: e.target.value,
    };
    const currentOwner = taskUsers
      .find(element => element.has_task.super_role === SUPER_ROLE.OWNER);
    toggleInvitationStatusPending();
    changeUserSuperRole(tid, payload)
      .then((success) => {
        if (success) {
          setUserSuperRole(payload.uid, payload.super_role);
          updateMessage('Super role was sucessulfy changed');
          if (payload.super_role === SUPER_ROLE.OWNER) {
            setUserSuperRole(currentOwner.basic.uid, SUPER_ROLE.ADMIN);
          }
          toggleInvitationStatusPending();
        }
      })
      .catch(() => {
        updateMessage('Change super role failed');
        toggleInvitationStatusPending();
      });
  };

  handleRoleChange = uid => (e) => {
    const {
      setUserRole,
      updateMessage,
      toggleInvitationStatusPending,
    } = this.props.actions;
    const { taskId: tid } = this.props.taskManager;
    const payload = {
      uid,
      role: e.target.value,
    };
    toggleInvitationStatusPending();
    changeUserRole(tid, payload)
      .then((success) => {
        if (success) {
          setUserRole(payload.uid, payload.role);
          updateMessage('Role was successfully changed');
        }
        toggleInvitationStatusPending();
      })
      .catch(() => {
        updateMessage('Change role failed');
        toggleInvitationStatusPending();
      });
  };

  render() {
    const {
      taskInfo, tasks, taskId, taskUsers, invitationStatusPending,
    } = this.props.taskManager;
    const activeTask = tasks.find(task => task.info.tid === taskId);
    const userPermission = activeTask ? activeTask.permission : {};

    return (
      <InvitationStatus
        roles={taskInfo.roles}
        users={taskUsers}
        userPermission={userPermission}
        handleRevokeInvitationClick={this.hanldeRevokeInvitationClick}
        handleSuperRoleChange={this.handleSuperRoleChange}
        handleRoleChange={this.handleRoleChange}
        isLoading={invitationStatusPending}
      />
    );
  }
}

const mapStateToProps = ({ taskManager, currentUserManager }) => ({
  taskManager, currentUserManager,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ ...snackbarActions, ...taskActions }, dispatch),
});


export default connect(mapStateToProps, mapDispatchToProps)(InvitationStatusContainer);
