import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Switch } from '../components/Switch';

import * as currentUserActions from '../actions/currentUserActions';

const EditSwitchContainer = (props) => {
  const { editMode } = props.currentUserManager;
  const { tasksMap, taskId } = props.taskManager;
  const { toggleEditMode } = props.actions;
  let isEditor = false;
  if (Object.prototype.hasOwnProperty.call(tasksMap, taskId)) {
    const superRole = tasksMap[taskId].has_task.super_role;
    isEditor = superRole === 5 || superRole === 10;
  }
  if (isEditor) {
    return (
      <Switch
        label="Editor"
        checked={editMode}
        onToggle={toggleEditMode}
      />
    );
  }
  return <div />;
};

const mapStateToProps = store => ({
  currentUserManager: store.currentUserManager,
  taskManager: store.taskManager,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(currentUserActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditSwitchContainer);
