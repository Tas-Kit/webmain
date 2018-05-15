import React from 'react';
import { connect } from 'react-redux';
import InvitationStatus from '../components/InvitationStatus';

const sampleUsers = [
  {
    has_task: {
      acceptance: 'a',
      role: null,
      id: 566,
      super_role: 10,
    },
    basic: {
      username: 'test',
      first_name: 'Test',
      last_name: 'TestL',
    },
  },
];

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
        users={sampleUsers}
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

const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(InvitationStatusContainer);
