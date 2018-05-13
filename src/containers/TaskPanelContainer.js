import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import TaskPanel from '../components/TaskPanel';
// import api from '../utils/api';
import APIService from '../services/APIService';

// redux actions
import * as taskActions from '../actions/taskActions';

class TaskPanelContainer extends React.Component {
  componentDidMount = () => {
    const url = '/task/?format=json';
    APIService.sendRequest(url, 'get_tasks');
  };

  handleTaskClick = taskId => () => {
    this.props.actions.setActiveTaskId(taskId);
    const url = `/task/graph/${taskId}`;
    APIService.sendRequest(url, 'get_task_graph');
  }

  render() {
    const { tasks } = this.props.taskManager;
    return <TaskPanel tasks={tasks} onTaskClick={this.handleTaskClick} />;
  }
}

const mapStateToProps = ({ taskManager }) => ({ taskManager });

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(taskActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(TaskPanelContainer);
