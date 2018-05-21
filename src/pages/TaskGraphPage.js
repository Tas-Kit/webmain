import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TaskToolbarContainer from '../containers/TaskToolbarContainer';
import GraphViewerContainer from '../containers/GraphViewerContainer';
import LoadingProgress from '../components/LoadingProgress';

// redux actions
import * as taskActions from '../actions/taskActions';

// services
import APIService from '../services/APIService';

// constants
import * as apiTypes from '../constants/apiTypes';

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
    const url = `/task/graph/${taskId}/`;
    APIService.sendRequest(url, apiTypes.GET_TASK_GRAPH)
      .then((success) => { console.log('get_task_graph api call success:', success); });
  }

  render() {
    const { pending } = this.props.taskManager;
    return (
      pending ?
        <LoadingProgress />
        :
        <div>
          {/* Task Toolbar */}
          <TaskToolbarContainer users={{}} />
          {/* Graph */}
          <GraphViewerContainer />
        </div>
    );
  }
}

const mapStateToProps = ({ taskManager }) => ({ taskManager });

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ ...taskActions }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(TaskGraphPage);
