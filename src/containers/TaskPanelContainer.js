import React from 'react';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';

import TaskPanel from '../components/TaskPanel';
// import api from '../utils/api';
import APIService from '../services/APIService';

class TaskPanelContainer extends React.Component {
  componentDidMount = () => {
    const url = '/task/?format=json';
    APIService.sendRequest(url, 'get_tasks');
  };

  handleTaskClick = taskId => () => {
    const url = `/task/graph/${taskId}`;
    APIService.sendRequest(url, 'get_task_graph');
  }

  render() {
    const { tasks } = this.props.taskManager;
    return <TaskPanel tasks={tasks} onTaskClick={this.handleTaskClick} />;
  }
}

const mapStateToProps = ({ taskManager }) => ({ taskManager });

export default connect(mapStateToProps)(TaskPanelContainer);
