import React from 'react';
import { connect } from 'react-redux';
import InvitationStatus from '../components/InvitationStatus';

class InvitationStatusContainer extends React.Component {
  //  TODO: Wire up with real actions
  hanldeRevokeInvitationClick = id => () => { };
  handleSuperRoleChange = id => () => { };
  handleRoleChange = id => () => { };

  render() {
    const { taskInfo } = this.props.taskManager;
    return (
      <InvitationStatus
        roles={taskInfo.roles}
        users={{}}
        hanldeRevokeInvitationClick={this.hanldeRevokeInvitationClick}
        handleSuperRoleChange={this.handleSuperRoleChange}
        handleRoleChange={this.handleRoleChange}
      />
    );
  }
}

const mapStateToProps = ({ taskManager }) => ({
  taskManager,
});

const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(InvitationStatusContainer);
