import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import TaskToolbarContainer from '../containers/TaskToolbarContainer';
import GraphViewerContainer from '../containers/GraphViewerContainer';
import LoadingProgress from '../components/LoadingProgress';

// redux actions
import * as taskActions from '../actions/taskActions';
import * as currentUserActions from '../actions/currentUserActions';
import * as snackbarActions from '../actions/snackbarActions';

// services
import APIService from '../services/APIService';

// constants
import * as apiTypes from '../constants/apiTypes';
import { TASK_GRAPH_URL } from '../constants/apiUrls';

class TaskGraphPage extends React.Component {
  componentDidMount = () => {
    const { taskId } = this.props.match.params;
    this.props.actions.setActiveTaskId(taskId);
    this.props.actions.resetEditMode();
    this.sendRequest(taskId);
  }

  componentWillReceiveProps = (nextProps) => {
    const { taskId: thisTaskId } = this.props.match.params;
    const { taskId: nextTaskId } = nextProps.match.params;
    if (thisTaskId !== nextTaskId) this.sendRequest(nextTaskId);
  }

  sendRequest = (taskId) => {
    const url = `${TASK_GRAPH_URL}${taskId}/`;
    APIService.sendRequest(url, apiTypes.GET_TASK_GRAPH)
      .then((success) => {
        if (!success) {
          const { updateMessage, toggleTaskActionPending } = this.props.actions;
          toggleTaskActionPending();
          updateMessage('No task found.');
          this.props.history.push('/task');
        }
      });
  }

  render() {
    const { pending } = this.props.taskManager;
    return (
      pending ?
        <LoadingProgress />
        :
        <div>
          {/* Task Toolbar */}
          <TaskToolbarContainer />
          {/* Graph */}
          <GraphViewerContainer />
        </div>
    );
  }
}

const mapStateToProps = ({ taskManager }) => ({ taskManager });

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ ...taskActions, ...currentUserActions, ...snackbarActions }, dispatch),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TaskGraphPage));
