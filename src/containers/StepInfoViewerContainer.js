import React from 'react';
import { connect } from 'react-redux';
import StepInfoView from '../components/StepInfoView';

const StepInfoViewerContainer = (props) => {
  const { stepInfo } = props.stepManager;
  const { taskUsers } = props.taskManager;

  const getUserIndex = (name) => {
    const users = taskUsers.map(user => user.basic.username);
    return users.indexOf(name);
  };
  // user's role in this task
  const { username } = props.currentUserManager;
  const userIndex = getUserIndex(username);
  let userTaskRole = null;
  if (userIndex >= 0) {
    userTaskRole = taskUsers[userIndex].has_task.role;
  }

  return (
    <StepInfoView
      info={stepInfo}
      userTaskRole={userTaskRole}
    />
  );
};

const mapStateToProps = store => ({
  taskManager: store.taskManager,
  stepManager: store.stepManager,
  dialogManager: store.dialogManager,
  currentUserManager: store.currentUserManager,
});

export default connect(mapStateToProps)(StepInfoViewerContainer);
