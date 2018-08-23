import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FormattedMessage } from 'react-intl';

import LoadingProgress from '../components/LoadingProgress';

// redux actions
import * as taskActions from '../actions/taskActions';
import * as snackbarActions from '../actions/snackbarActions';

// containers
import SnackbarContainer from '../containers/SnackbarContainer';
import PureGraphViewerContainer from '../containers/PureGraphViewerContainer';
import NodeDescriptionBoxContainer from '../containers/NodeDescriptionBoxContainer';

// services
import APIService from '../services/APIService';

// constants
import * as apiTypes from '../constants/apiTypes';
import { TASK_GRAPH_URL } from '../constants/apiUrls';

const inline = {
  buttonDiv: {
    marginLeft: 20,
    marginRight: 20,
  },
  progress: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
};

class DisplayWorkflowPage extends React.Component {
  constructor() {
    super();
    this.state = {
      success: false,
    };
  }

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
    const url = `${TASK_GRAPH_URL}${taskId}/`;
    APIService.sendRequest(url, apiTypes.GET_TASK_GRAPH)
      .then((success) => {
        if (!success) {
          const { updateMessage, toggleTaskActionPending } = this.props.actions;
          toggleTaskActionPending();
          updateMessage(<FormattedMessage id="noTaskFoundMsg" />);
        }
        this.setState({ success });
      });
  }

  render() {
    const { pending } = this.props.taskManager;
    const { descriptionOpened } = this.props.graphManager;
    console.log(descriptionOpened);
    const { success } = this.state;
    return (
      <div>
        {pending && <LoadingProgress style={inline.progress} />}

        {/* Pure Graph Viewer */}
        {!pending && success && <PureGraphViewerContainer />}

        {/* Snack Bar */}
        <SnackbarContainer />

        {/* Node Description Box */}
        {descriptionOpened && <NodeDescriptionBoxContainer />}
      </div>
    );
  }
}

const mapStateToProps = ({ taskManager, graphManager }) => ({ taskManager, graphManager });

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ ...taskActions, ...snackbarActions }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(DisplayWorkflowPage);
