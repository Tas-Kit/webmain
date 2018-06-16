import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FormattedMessage } from 'react-intl';
import { FormDialog } from '../components/Dialogs';
import TaskInfoViewerContainer from '../containers/TaskInfoViewerContainer';
import * as dialogActions from '../actions/dialogActions';

const TaskViewerDialogContainer = (props) => {
  const { taskViewerOpen } = props.dialogManager;
  const { toggleTaskViewer } = props.actions;
  return (
    <FormDialog
      disableButtons
      title={<FormattedMessage id="taskViewerTitle" />}
      hints={<FormattedMessage id="taskViewerHint" />}
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
