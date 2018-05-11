import React from 'react';
import TaskPanel from '../components/TaskPanel';
import { fetchTasks } from '../utils/api';

class TaskPanelContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      isLoading: false,
      isError: false,
    };
  }

  componentDidMount = () => {
    fetchTasks()
      .then(res => {
        console.log(res);
        this.setState({
          tasks: res,
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

  render() {
    // passing extra props to child
    return <TaskPanel {...this.props} tasks={this.state.tasks} />;
  }
}

export default TaskPanelContainer;
