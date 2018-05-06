import React from 'react';
import TaskPanel from '../components/TaskPanel';
import TaskToolbar from '../components/TaskToolbar';
import TaskAppBar from '../components/TaskAppBar';
import api from '../utils/api';

const drawerWidth = 240;

const styles = {
  header: {
    position: 'absolute',
    display: 'inline-box',
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth
  }
};

class TaskView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTaskId: '',
      tasks: {},
      isLoading: false,
      isError: false
    };
  }

  componentDidMount = () => {
    api
      .fetchTasks()
      .then(res => {
        console.log(res);
        return res.json();
      })
      .then(tasks => {
        this.setState({
          tasks: tasks,
          isLoading: false,
          isError: false
        });
      })
      .catch(e => {
        console.log(e);
        this.setState({
          isError: true
        });
      });
  };

  handleTaskClick = id => {
    return () => {
      this.setState({
        activeTaskId: id
      });
    };
  };

  render() {
    return (
      <div
        style={{
          color: '#424242'
        }}
      >
        <header style={styles.header}>
          <TaskAppBar
            taskTitle={
              this.state.activeTaskId
                ? this.state.tasks[this.state.activeTaskId]
                : ''
            }
          />
          <TaskToolbar />
        </header>

        <TaskPanel tasks={this.state.tasks} />
      </div>
    );
  }
}

export default TaskView;
