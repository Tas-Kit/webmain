import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TaskInfo from '../components/TaskInfo';

// redux actions
import * as dialogActions from '../actions/dialogActions';
import * as taskActions from '../actions/taskActions';

class TaskInfoContainer extends React.Component {
  componentDidMount = () => {
    const { taskInfo } = this.props.taskManager;
    this.props.actions.setTaskInfoOrigin(taskInfo);
  }

  render() {
    const { taskInfo } = this.props.taskManager;
    const { updateTaskInfo } = this.props.actions;
    return (
      <TaskInfo
        info={taskInfo}
        update={updateTaskInfo}
      />
    );
  }
}

const mapStateToProps = ({ taskManager, dialogManager }) => ({
  taskManager,
  dialogManager,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ ...taskActions, ...dialogActions }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(TaskInfoContainer);
