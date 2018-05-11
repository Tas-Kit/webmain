import React from 'react';
import TaskPanel from '../components/TaskPanel';
import TaskToolBarContainer from '../containers/TaskToolbarContainer';
import TaskAppBar from '../components/TaskAppBar';
import { GraphViewer } from '../components/Graph';
import { fetchTasks, fetchTaskGraph } from '../utils/api';

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
      activeTaskId: '',
      currTaskGraph: {},
      tasks: {},
      isLoading: false,
      isError: false,
    };
  }

  componentDidMount = () => {
    fetchTasks()
      .then(tasks => {
        console.log(tasks);
        this.setState({
          tasks,
          isLoading: false,
          isError: false,
        });
      })
      .catch(e => {
        console.log(e);
        this.setState({
          isError: true,
        });
      });
  };

  fetchTaskGraph = id => {
    fetchTaskGraph(id)
      .then(graph => {
        this.setState({
          currTaskGraph: graph,
          activeTaskId: id,
        });
      })
      .catch(e => {
        console.log(e);
        this.setState({
          isError: true,
        });
      });
  };

  handleTaskClick = id => () => {
    this.fetchTaskGraph(id);
  };

  render() {
    const { tasks, activeTaskId, currTaskGraph } = this.state;
    return (
      <div style={styles.taskView}>
        <TaskPanel tasks={tasks} handleTaskClick={this.handleTaskClick} />
        <div style={styles.content}>
          <TaskAppBar
            taskTitle={activeTaskId ? tasks[activeTaskId].task.name : ''}
          />
          <TaskToolBarContainer
            users={currTaskGraph.users ? currTaskGraph.users : {}}
          />
          <GraphViewer />
        </div>
      </div>
    );
  }
}

export default TaskView;
