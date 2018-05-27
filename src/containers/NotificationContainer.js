import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Notification from '../components/Notification';
import * as taskActions from '../actions/taskActions';
import { rejectInvitation, acceptInvitation, getTask } from '../utils/api';

class NotificationContainer extends React.Component {
  handleAcceptClick = tid => () => {
    acceptInvitation(tid)
      .then(() => getTask())
      .catch(e => console.log(e));
  };
  handleRejectClick = tid => () => {
    rejectInvitation(tid)
      .then(() => getTask())
      .catch(e => console.log(e));
  };
  render() {
    const { tasks } = this.props.taskManager;
    return (
      <Notification
        tasks={tasks}
        handleAcceptClick={this.handleAcceptClick}
        handleRejectClick={this.handleRejectClick}
      />);
  }
}

const mapStateToProps = ({ taskManager }) => ({ taskManager });

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ ...taskActions }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(NotificationContainer);
