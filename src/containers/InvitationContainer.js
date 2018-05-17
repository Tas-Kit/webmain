import React from 'react';
import { connect } from 'react-redux';
import Invitation from '../components/Invitation';

// redux actions
import * as dialogActions from '../actions/dialogActions';
import * as stepActions from '../actions/stepActions';

class InvitationContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      usernameToInvite: '',
    };
  }

  handleInvitationClick = () => { };


  handleUsernameToInviteChange = (e) => {
    this.setState({
      usernameToInvite: e.target.value,
    });
  };

  render() {
    return (
      <Invitation
        usernameToInvite={this.state.usernameToInvite}
        handleUsernameToInviteChange={this.handleUsernameToInviteChange}
        handleInvitationClick={this.handleInvitationClick}
      />
    );
  }
}

const mapStateToProps = null;
const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(InvitationContainer);
