import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TaskToolbarContainer from '../containers/TaskToolbarContainer';
import GraphViewerContainer from '../containers/GraphViewerContainer';

// redux actions
import * as taskActions from '../actions/taskActions';

import APIService from '../services/APIService';

class TaskGraphPage extends React.Component {
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
    return (
      <div>
        {/* Task Toolbar */}
        <TaskToolbarContainer users={{}} />
        {/* Graph */}
        <GraphViewerContainer />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ ...taskActions }, dispatch),
});

export default connect(null, mapDispatchToProps)(TaskGraphPage);
