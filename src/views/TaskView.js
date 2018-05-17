import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { GraphViewer } from '../components/Graph';
import DialogsContainer from '../containers/DialogsContainer';
import TaskPanelContainer from '../containers/TaskPanelContainer';
import TaskAppBarContainer from '../containers/TaskAppBarContainer';
import TaskToolbarContainer from '../containers/TaskToolbarContainer';
import SnackbarContainer from '../containers/SnackbarContainer';

// services
import APIService from '../services/APIService';

// actions
import * as snackbarActions from '../actions/snackbarActions';

// constants
import { MIN_ALLOW_WINDOW_WIDTH } from '../constants';

const styles = {
  taskView: {
    display: 'flex',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    minWidth: MIN_ALLOW_WINDOW_WIDTH,
  },
};

class TaskView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currTaskGraph: {},
    };
  }

  componentDidMount = () => {
    const url = '/task/?format=json';
    APIService.sendRequest(url, 'get_tasks')
      .then((success) => {
        console.log('get_tasks api success:', success);
      })
      .catch(() => {
        this.props.actions.updateMessage('Get tasks failed.');
      });
  };

  render() {
    const { currTaskGraph } = this.state;
    return (
      <div style={styles.taskView}>
        <TaskPanelContainer />
        <div style={styles.content}>
          <TaskAppBarContainer />
          <TaskToolbarContainer users={currTaskGraph.users || {}} />
          <GraphViewer />
        </div>

        {/* Dialogs */}
        <DialogsContainer />

        {/* Snack Bar */}
        <SnackbarContainer />
      </div>
    );
  }
}


const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ ...snackbarActions }, dispatch),
});

export default connect(null, mapDispatchToProps)(TaskView);
