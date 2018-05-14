import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Invitation from '../components/Invitation';

// redux actions
import * as dialogActions from '../actions/dialogActions';
import * as stepActions from '../actions/stepActions';

class InvitationContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      usernameToInvite: ''
    };
  }

  hanldeRevokeInvitationClick = id => () => {};

  handleInvitationClick = () => {};

  handleSuperRoleChange = id => () => {};

  handleRoleChange = id => () => {};

  handleUsernameToInviteChange = e => {
    this.setState({
      usernameToInvite: e.target.value
    });
  };

  render() {
    const { taskInfo } = this.props.taskManager;
    // const { updateStepInfo } = this.props.actions;
    return (
      <Invitation
        roles={taskInfo.roles}
        usernameToInvite={this.usernameToInvite}
        handleInvitationClick={this.handleInvitationClick}
        users={{}}
        hanldeRevokeInvitationClick={this.hanldeRevokeInvitationClick}
        handleSuperRoleChange={this.handleSuperRoleChange}
        handleRoleChange={this.handleRoleChange}
        handleUsernameToInviteChange={this.handleUsernameToInviteChange}
      />
    );
  }
}

const mapStateToProps = ({ taskManager }) => ({
  taskManager
});

// const mapDispatchToProps = dispatch => ({
//   actions: bindActionCreators({ ...stepActions, ...dialogActions }, dispatch)
// });

export default connect(mapStateToProps, null)(InvitationContainer);
