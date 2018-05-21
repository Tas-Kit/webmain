import React from 'react';
import shortid from 'shortid';
import Validator from 'validatorjs';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import StepInfoContainer from './StepInfoContainer';
import { FormDialog } from '../components/Dialogs';

// redux actions
import * as dialogActions from '../actions/dialogActions';
import * as snackbarActions from '../actions/snackbarActions';
import * as taskActions from '../actions/taskActions';

// services
import gs from '../services/GraphService';

// constants and utils
import { STEP_INFO_RULE } from '../constants';
import { NODE_IMAGE_MAP, NORMAL_NODE } from '../constants/nodes';
import { mapStepInfoToNode } from '../utils/functions';

class StepCreatorDialogContainer extends React.Component {
  handleStepInfoSave = () => {
    // add node
    const { stepInfo } = this.props.stepManager;
    const { canvasCoord, draggingIndex } = this.props.graphManager;
    const { updateMessage } = this.props.actions;
    const validation = new Validator(stepInfo, STEP_INFO_RULE);
    if (validation.passes()) {
      const stepNode = {
        ...stepInfo,
        id: shortid.generate(),
        x: canvasCoord.x,
        y: canvasCoord.y,
        node_type: NORMAL_NODE,
        image: NODE_IMAGE_MAP[draggingIndex],
      };
      const nodeToAdd = mapStepInfoToNode(stepNode);
      gs.addNode(nodeToAdd);
      return new Promise((resolve) => { resolve(); }).then(() => true);
    }
    return new Promise((resolve) => {
      updateMessage('Invalid form data. Please check it again.');
      resolve();
    })
      .then(() => false);
  };

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

const mapStateToProps = store => ({
  dialogManager: store.dialogManager,
  stepManager: store.stepManager,
  snackbarManager: store.snackbarManager,
  graphManager: store.graphManager,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ ...dialogActions, ...snackbarActions, ...taskActions }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(StepCreatorDialogContainer);
