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

  hanldeRevokeInvitationClick = id => () => {

  }

  handleInvitationClik = () => {

  }

  handleSuperRoleChange = id => () => { }

  handleRoleChange = id => () => { }


  render() {
    const { stepInfo } = this.props.stepManager;
    const { updateStepInfo } = this.props.actions;
    return (
      <Invitation
        roles={null}
        usernameToInvite={this.usernameToInvite}
        handleInvitationClik={this.handleInvitationClik}
        users={null}
        hanldeRevokeInvitationClick={this.hanldeRevokeInvitationClick}
        handleSuperRoleChange={this.handleSuperRoleChange}
        handleRoleChange={this.handleRoleChange}
      />
    );
  }
}

const mapStateToProps = ({ stepManager, dialogManager }) => ({
  stepManager,
  dialogManager,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ ...stepActions, ...dialogActions }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(InvitationContainer);
