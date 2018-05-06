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
        if (res.ok) {
          return res.json();
        } else {
          console.log(res);
          throw new Error('Failed to fetch tasks');
        }
      })
      .then(tasks => {
        console.log(tasks);
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
    const { tasks, activeTaskId } = this.state;
    return (
      <div
        style={{
          color: '#424242'
        }}
      >
        <header style={styles.header}>
          <TaskAppBar
            taskTitle={activeTaskId ? tasks[activeTaskId].task.name : ''}
          />
          <TaskToolbar />
        </header>

        <TaskPanel tasks={tasks} handleTaskClick={this.handleTaskClick} />
      </div>
    );
  }
}

export default TaskView;
