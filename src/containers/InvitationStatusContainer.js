import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import InvitationStatus from '../components/InvitationStatus';
import * as taskActions from '../actions/taskActions';
import * as snackbarActions from '../actions/snackbarActions';
import APIService from '../services/APIService';
import { SUPER_ROLE } from '../constants';

class InvitationStatusContainer extends React.Component {
  //  TODO: Update locals users after sent invitation

  hanldeRevokeInvitationClick = uid => () => {
    const {
      toggleTaskActionPending,
      updateMessage,
      removeUser,
    } = this.props.actions;
    const { taskId: tid } = this.props.taskManager;
    const payload = {
      uid,
    };
    toggleTaskActionPending();
    const revokeUrl = `/task/invitation/revoke/${tid}/`;
    APIService.sendRequest(revokeUrl, 'revoke_invitation', payload, 'POST')
      .then((success) => {
        if (success) {
          removeUser(uid);
          updateMessage('Invitation was revoked successfully');
          toggleTaskActionPending();
        }
      })
      .catch(() => {
        updateMessage('Revoke invitation failed');
        toggleTaskActionPending();
      });
  };

  handleSuperRoleChange = uid => (e) => {
    const {
      toggleTaskActionPending,
      setUserSuperRole,
      updateMessage,
    } = this.props.actions;
    const { taskId: tid, taskUsers } = this.props.taskManager;
    const payload = {
      uid,
      super_role: e.target.value,
    };
    const currentOwner = taskUsers
      .find(element => element.has_task.super_role === SUPER_ROLE.OWNER);
    const changeUrl = `/task/invitation/change/${tid}/`;
    toggleTaskActionPending();
    APIService.sendRequest(changeUrl, 'change_superrole', payload, 'POST')
      .then((success) => {
        if (success) {
          setUserSuperRole(payload.uid, payload.super_role);
          updateMessage('Super role was sucessulfy changed');
          if (payload.super_role === SUPER_ROLE.OWNER) {
            setUserSuperRole(currentOwner.basic.uid, SUPER_ROLE.ADMIN);
          }
          toggleTaskActionPending();
        }
      })
      .catch(() => {
        updateMessage('Change super role failed');
        toggleTaskActionPending();
      });
  };

  handleRoleChange = uid => (e) => {
    const {
      toggleTaskActionPending,
      setUserRole,
      updateMessage,
    } = this.props.actions;
    const { taskId: tid } = this.props.taskManager;
    const payload = {
      uid,
      role: e.target.value,
    };
    toggleTaskActionPending();
    const changeUrl = `/task/invitation/change/${tid}/`;
    APIService.sendRequest(changeUrl, 'change_role', payload, 'POST')
      .then((success) => {
        if (success) {
          setUserRole(payload.uid, payload.role);
          updateMessage('Role was successfully changed');
          toggleTaskActionPending();
        }
      })
      .catch(() => {
        updateMessage('Change role failed');
        toggleTaskActionPending();
      });
  };

  render() {
    const {
      taskInfo, tasks, taskId, taskUsers,
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
