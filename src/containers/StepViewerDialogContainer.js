import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import StepInfoViewerContainer from './StepInfoViewerContainer';
import { FormDialog } from '../components/Dialogs';

// redux actions
import * as dialogActions from '../actions/dialogActions';
import * as snackbarActions from '../actions/snackbarActions';
import * as taskActions from '../actions/taskActions';

class StepViewerDialogContainer extends React.Component {
  handleStepInfoSave = () => {
  };

  render() {
    const { stepViewerOpen } = this.props.dialogManager;
    const { toggleStepViewer } = this.props.actions;
    return (
      <FormDialog
        disableButtons
        title="Step Information"
        hints="View the information of this step below."
        openState={stepViewerOpen}
        toggle={toggleStepViewer}
        dialogStyle={{ minWidth: 400 }}
        component={<StepInfoViewerContainer />}
      />
    );
  }
}

const mapStateToProps = store => ({
  dialogManager: store.dialogManager,
  stepManager: store.stepManager,
  snackbarManager: store.snackbarManager,
  graphManager: store.graphManager,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ ...dialogActions, ...snackbarActions, ...taskActions }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(StepViewerDialogContainer);
