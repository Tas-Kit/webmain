import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import InvitationStatus from '../components/InvitationStatus';
import * as taskActions from '../actions/taskActions';
import * as snackbarActions from '../actions/snackbarActions';
import APIService from '../services/APIService';

class InvitationStatusContainer extends React.Component {
  //  TODO: Update locals users after sent invitation

  hanldeRevokeInvitationClick = uid => () => {
    const {
      toggleTaskActionPending,
      updateMessage,
    } = this.props.actions;
    const { taskId: tid } = this.props.taskManager.taskInfo;
    const payload = {
      tid,
      uid,
    };
    toggleTaskActionPending();
    const revokeUrl = `/api/v1/task/invitation/revoke/${tid}`;
    APIService.sendRequest(revokeUrl, 'revoke_invitation', payload, 'POST')
      .then((success) => {
        if (success) {
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
      updateMessage,
    } = this.props.actions;
    const { taskId: tid } = this.props.taskManager.taskInfo;
    const payload = {
      tid,
      uid,
      super_role: e.target.value,
    };
    toggleTaskActionPending();
    const changeUrl = `/task/invitation/change/${tid}`;
    APIService.sendRequest(changeUrl, 'change_superrole', payload, 'POST')
      .then((success) => {
        if (success) {
          updateMessage('Super role was sucessulfy changed');
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
      updateMessage,
    } = this.props.actions;
    const { taskId: tid } = this.props.taskManager.taskInfo;
    const payload = {
      tid,
      uid,
      role: e.target.value,
    };
    toggleTaskActionPending();
    const changeUrl = `/task/invitation/change/${tid}`;
    APIService.sendRequest(changeUrl, 'change_role', payload, 'POST')
      .then((success) => {
        if (success) {
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

const mapStateToProps = ({ taskManager }) => ({
  taskManager,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ ...snackbarActions, ...taskActions }, dispatch),
});


export default connect(mapStateToProps, mapDispatchToProps)(InvitationStatusContainer);
