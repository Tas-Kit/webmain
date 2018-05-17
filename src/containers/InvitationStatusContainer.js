import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import InvitationStatus from '../components/InvitationStatus';


import * as taskActions from '../actions/taskActions';
import * as snackbarActions from '../actions/snackbarActions';

import APIService from '../services/APIService';

class InvitationStatusContainer extends React.Component {
  //  TODO: Wire up with real actions

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
          const getGraphUrl = `/task/graph/${tid}`;
          APIService.sendRequest(getGraphUrl, 'get_task_graph');
          toggleTaskActionPending();
        }
      })
      .catch(() => {
        updateMessage('Revoke invitation failed');
        toggleTaskActionPending();
      });
  };
  handleSuperRoleChange = uid => () => { };
  handleRoleChange = uid => () => { };

  render() {
    const { taskInfo } = this.props.taskManager;
    return (
      <InvitationStatus
        roles={taskInfo.roles}
        users={[]}
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
