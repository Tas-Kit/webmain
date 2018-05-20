import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Invitation from '../components/Invitation';
import * as taskActions from '../actions/taskActions';
import * as snackbarActions from '../actions/snackbarActions';
import APIService from '../services/APIService';

class InvitationContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      usernameToInvite: '',
    };
  }

  handleInvitationClick = () => {
    const {
      toggleTaskActionPending,
      updateMessage,
    } = this.props.actions;
    const { taskId: tid } = this.props.taskManager;
    const payload = {
      tid,
      username: this.state.usernameToInvite,
    };
    toggleTaskActionPending();
    const inviteUrl = `/task/invitation/${tid}`;
    APIService.sendRequest(inviteUrl, 'create_invitation', payload, 'POST')
      .then((success) => {
        if (success) {
          updateMessage('You have successfully sent the invitation');
          toggleTaskActionPending();
        }
      })
      .catch(() => {
        updateMessage('Invitation failed');
        toggleTaskActionPending();
      });
  };


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

const mapStateToProps = ({ taskManager }) => ({
  taskManager,
});
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ ...snackbarActions, ...taskActions }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(InvitationContainer);
