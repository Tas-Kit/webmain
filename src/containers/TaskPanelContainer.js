import React from 'react';
import TaskPanel from '../components/TaskPanel';
import api from '../utils/api';

class TaskPanelContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
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
      .then(res => {
        this.setState({
          tasks: api.adaptTasks(res),
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

  render() {
    // passing extra props to child
    return <TaskPanel {...this.props} tasks={this.state.tasks} />;
  }
}

export default TaskPanelContainer;
