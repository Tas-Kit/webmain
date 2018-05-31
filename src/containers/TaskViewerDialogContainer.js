import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FormDialog } from '../components/Dialogs';
import TaskInfoViewerContainer from '../containers/TaskInfoViewerContainer';
import * as dialogActions from '../actions/dialogActions';

const TaskViewerDialogContainer = (props) => {
  const { taskViewerOpen } = props.dialogManager;
  const { toggleTaskViewer } = props.actions;
  return (
    <FormDialog
      disableButtons
      title="Task Viewer"
      hints="View the information of this task below."
      openState={taskViewerOpen}
      toggle={toggleTaskViewer}
      component={<TaskInfoViewerContainer />}
    />
  );
};

const mapStateToProps = store => ({
  dialogManager: store.dialogManager,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(dialogActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(TaskViewerDialogContainer);
