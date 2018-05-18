import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { bindActionCreators } from 'redux';

// ui component
import TaskToolbar from '../components/TaskToolbar';

// redux action
import * as dialogActions from '../actions/dialogActions';
import * as taskActions from '../actions/taskActions';

import APIService from '../services/APIService';

class TaskToolbarContainer extends React.Component {
  componentDidMount = () => {
    const { taskId } = this.props.match.params;
    this.props.actions.setActiveTaskId(taskId);
    this.sendRequest(taskId);
  }

  componentWillReceiveProps = (nextProps) => {
    const { taskId: thisTaskId } = this.props.match.params;
    const { taskId: nextTaskId } = nextProps.match.params;
    if (thisTaskId !== nextTaskId) this.sendRequest(nextTaskId);
  }

  sendRequest = (taskId) => {
    const url = `/task/graph/${taskId}`;
    APIService.sendRequest(url, 'get_task_graph')
      .then((success) => { console.log('get_task_graph api call success:', success); });
  }

  render() {
    const { toggleTaskInfoEditor, toggleDeleteTask, toggleInvitation } = this.props.actions;
    const { users } = this.props;
    return (
      <TaskToolbar
        users={users}
        toggleTaskInfoEditor={toggleTaskInfoEditor}
        toggleDeleteTask={toggleDeleteTask}
        toggleInvitation={toggleInvitation}
      />
    );
  }
}

const mapStateToProps = ({ taskManager }) => ({ taskManager });

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ ...dialogActions, ...taskActions }, dispatch),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TaskToolbarContainer));
