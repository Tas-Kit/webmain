import React from 'react';
import TaskToolbar from '../components/TaskToolbar';
import { GraphViewer } from '../components/Graph';
import DialogsContainer from '../containers/DialogsContainer';
import TaskPanelContainer from '../containers/TaskPanelContainer';
import TaskAppBarContainer from '../containers/TaskAppBarContainer';
// import api from '../utils/api';

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
      isLoading: false,
      isError: false
    };
  }

  componentDidMount = () => {
    // api
    //   .fetchTasks()
    //   .then(tasks => {
    //     console.log(tasks);
    //     this.setState({
    //       tasks: tasks,
    //       isLoading: false,
    //       isError: false
    //     });
    //   })
    //   .catch(e => {
    //     console.log(e);
    //     this.setState({
    //       isError: true
    //     });
    //   });

    APIService.sendRequest('/task/?format=json', 'get_tasks');
  };

  // fetchTaskGraph = id => {
  //   api
  //     .fetchTaskGraph(id)
  //     .then(graph => {
  //       this.setState({
  //         currTaskGraph: graph,
  //         activeTaskId: id
  //       });
  //     })
  //     .catch(e => {
  //       console.log(e);
  //       this.setState({
  //         isError: true
  //       });
  //     });
  // };
  //
  // handleTaskClick = id => {
  //   return () => {
  //     this.fetchTaskGraph(id);
  //   };
  // };

  render() {
    const { currTaskGraph } = this.state;
    return (
      <div style={styles.taskView}>
        <TaskPanelContainer />
        <div style={styles.content}>
          <TaskAppBarContainer />
          <TaskToolbar
            users={currTaskGraph.users ? currTaskGraph.users : {}}
          />
          <GraphViewer />
        </div>

        {/* Dialogs */}
        <DialogsContainer />
      </div>
    );
  }
}

export default TaskView;
