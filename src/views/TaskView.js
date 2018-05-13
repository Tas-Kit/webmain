import React from 'react';
import { GraphViewer } from '../components/Graph';
import DialogsContainer from '../containers/DialogsContainer';
import TaskPanelContainer from '../containers/TaskPanelContainer';
import TaskAppBarContainer from '../containers/TaskAppBarContainer';
import TaskToolbarContainer from '../containers/TaskToolbarContainer';
import SnackbarContainer from '../containers/SnackbarContainer';

import APIService from '../services/APIService';

const styles = {
  taskView: {
    color: '#424242',
    display: 'flex',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
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
    APIService.sendRequest('/task/?format=json', 'get_tasks');
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

export default TaskView;
