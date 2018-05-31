import React from 'react';
import shortid from 'shortid';
import Validator from 'validatorjs';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import StepInfoFormContainer from './StepInfoFormContainer';
import { FormDialog } from '../components/Dialogs';

// redux actions
import * as dialogActions from '../actions/dialogActions';
import * as snackbarActions from '../actions/snackbarActions';
import * as taskActions from '../actions/taskActions';

// services
import gs from '../services/GraphService';

// constants and utils
import { STEP_INFO_RULE, STATUS_MAP } from '../constants';
import { NORMAL_NODE, NODE_STATUS_COLOR_MAP } from '../constants/nodes';
import { mapStepInfoToNode } from '../utils/functions';
import * as svgStrings from '../assets/svgStrings';

class StepEditorDialogContainer extends React.Component {
  handleStepModify = () => {
    // edit node
    const { stepInfo } = this.props.stepManager;
    const { updateMessage } = this.props.actions;
    const validation = new Validator(stepInfo, STEP_INFO_RULE);
    if (validation.passes()) {
      const color = NODE_STATUS_COLOR_MAP[STATUS_MAP[stepInfo.status]];
      const svgString = svgStrings[NORMAL_NODE](color);
      const imageUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgString)}`;
      const stepNode = {
        ...stepInfo,
        id: gs.activeItemId,
        node_type: NORMAL_NODE, // current only NORMAL_NODE is available
        image: imageUrl,
      };
      const nodeToUpdate = mapStepInfoToNode(stepNode);
      gs.updateNode(nodeToUpdate);
      return new Promise((resolve) => { resolve(); }).then(() => true);
    }
    return new Promise((resolve) => {
      updateMessage('Invalid form data. Please check it again.');
      resolve();
    })
      .then(() => false);
  }

  render() {
    const { stepEditorOpen } = this.props.dialogManager;
    const { toggleStepEditor } = this.props.actions;
    return (
      <FormDialog
        title="Step Editor"
        hints="To edit a step, please fill in the fields below."
        openState={stepEditorOpen}
        toggle={toggleStepEditor}
        onSave={this.handleStepModify}
        component={<StepInfoFormContainer />}
      />
    );
  }
}

const mapStateToProps = store => ({
  dialogManager: store.dialogManager,
  stepManager: store.stepManager,
  snackbarManager: store.snackbarManager,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ ...dialogActions, ...snackbarActions, ...taskActions }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(StepEditorDialogContainer);