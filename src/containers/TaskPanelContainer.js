import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { bindActionCreators } from 'redux';

import TaskPanel from '../components/TaskPanel';
import APIService from '../services/APIService';

// redux actions
import * as taskActions from '../actions/taskActions';

class TaskPanelContainer extends React.Component {
  handleTaskClick = taskId => () => {
    this.props.actions.setActiveTaskId(taskId);
    const url = `/task/graph/${taskId}`;
    APIService.sendRequest(url, 'get_task_graph');
  }

  render() {
    const { tasks } = this.props.taskManager;
    const { username } = this.props.currentUserManager;
    return <TaskPanel username={username} tasks={tasks} onTaskClick={this.handleTaskClick} />;
  }
}

const mapStateToProps = ({ taskManager, currentUserManager }) => ({ taskManager, currentUserManager });

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ ...taskActions }, dispatch),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TaskPanelContainer));
