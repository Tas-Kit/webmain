import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FormattedMessage } from 'react-intl';

import StepInfoViewerContainer from './StepInfoViewerContainer';
import { FormDialog } from '../components/Dialogs';

// redux actions
import * as dialogActions from '../actions/dialogActions';
import * as snackbarActions from '../actions/snackbarActions';
import * as taskActions from '../actions/taskActions';

const StepViewerDialogContainer = props => {
  const { stepViewerOpen } = props.dialogManager;
  const { toggleStepViewer } = props.actions;
  return (
    <FormDialog
      disableButtons
      title={<FormattedMessage id="stepViewerTitle" />}
      hints={<FormattedMessage id="stepViewerHint" />}
      openState={stepViewerOpen}
      toggle={toggleStepViewer}
      component={<StepInfoViewerContainer />}
    />
  );
};

const mapStateToProps = store => ({
  dialogManager: store.dialogManager,
  stepManager: store.stepManager,
  snackbarManager: store.snackbarManager,
  graphManager: store.graphManager
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    { ...dialogActions, ...snackbarActions, ...taskActions },
    dispatch
  )
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StepViewerDialogContainer);
