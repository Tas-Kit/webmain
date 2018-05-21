import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import StepInfoContainer from './StepInfoContainer';
import { FormDialog } from '../components/Dialogs';

// redux actions
import * as dialogActions from '../actions/dialogActions';
import * as snackbarActions from '../actions/snackbarActions';
import * as taskActions from '../actions/taskActions';

class StepCreatorDialogContainer extends React.Component {
  handleStepInfoSave = () => (
    new Promise((resolve) => { resolve(); }).then(() => true)
  );
  render() {
    const { stepCreatorOpen } = this.props.dialogManager;
    const { pending } = this.props.stepManager;
    const { toggleStepCreator } = this.props.actions;
    return (
      <FormDialog
        title="Step Info"
        hints="To create a step, please fill in the fields below."
        openState={stepCreatorOpen}
        toggle={toggleStepCreator}
        onSave={this.handleStepInfoSave}
        component={<StepInfoContainer />}
        loading={pending}
      />
    );
  }
}

const mapStateToProps = ({ dialogManager, stepManager, snackbarManager }) => ({
  dialogManager,
  stepManager,
  snackbarManager,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ ...dialogActions, ...snackbarActions, ...taskActions }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(StepCreatorDialogContainer);
