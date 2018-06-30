import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FormattedMessage } from 'react-intl';
import Invitation from '../components/Invitation';
import * as taskActions from '../actions/taskActions';
import * as snackbarActions from '../actions/snackbarActions';
import { createInvitation } from '../utils/api';

class InvitationContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      usernameToInvite: '',
      isLoading: false,
    };
  }

  handleInvitationClick = () => {
    const {
      updateMessage,
    } = this.props.actions;
    const { taskId: tid } = this.props.taskManager;
    const payload = {
      username: this.state.usernameToInvite,
    };
    this.setState({ isLoading: true });
    createInvitation(tid, payload)
      .then((success) => {
        if (success) {
          updateMessage(<FormattedMessage id="sendInvitationMsg" />);
        }
      })
      .catch(() => {
        updateMessage(<FormattedMessage id="sendInvitationFailMsg" />);
      }).finally(() => {
        this.setState({ isLoading: false });
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
        isLoading={this.state.isLoading}
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
