import React from 'react';
import Validator from 'validatorjs';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FormattedMessage } from 'react-intl';

import StepInfoFormContainer from './StepInfoFormContainer';
import { FormDialog } from '../components/Dialogs';

// redux actions
import * as dialogActions from '../actions/dialogActions';
import * as snackbarActions from '../actions/snackbarActions';
import * as taskActions from '../actions/taskActions';
import * as graphActions from '../actions/graphActions';

// services
import gs from '../services/GraphService';

// constants and utils
import { STEP_INFO_RULE, STATUS_MAP } from '../constants';
import { START_NODE, END_NODE, NORMAL_NODE, NODE_STATUS_COLOR_MAP } from '../constants/nodes';
import { mapStepInfoToNode, getColoredEdgeByNode } from '../utils/functions';
import * as svgStrings from '../assets/svgStrings';

class StepEditorDialogContainer extends React.Component {
  handleStepModify = () => {
    // edit node
    const { stepInfo } = this.props.stepManager;
    const { updateMessage } = this.props.actions;
    const validation = new Validator(stepInfo, STEP_INFO_RULE);
    if (validation.passes()) {
      const color = NODE_STATUS_COLOR_MAP[STATUS_MAP[stepInfo.status]];
      let svgString = svgStrings[NORMAL_NODE](color);
      let nodeType = NORMAL_NODE;
      if (stepInfo.name === 'Start') {
        svgString = svgStrings[START_NODE](color);
        nodeType = START_NODE;
      } else if (stepInfo.name === 'End') {
        svgString = svgStrings[END_NODE](color);
        nodeType = END_NODE;
      }
      const imageUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgString)}`;
      const stepNode = {
        ...stepInfo,
        id: gs.activeItemId,
        node_type: nodeType, // current only NORMAL_NODE is available
        image: imageUrl,
      };
      const nodeToUpdate = mapStepInfoToNode(stepNode);
      const edgesToUpdate = getColoredEdgeByNode(nodeToUpdate);
      gs.updateNode(nodeToUpdate);
      gs.updateEdge(edgesToUpdate);
      this.props.actions.updateGraphDataJson(JSON.parse(JSON.stringify(gs.activeData)));
      return new Promise((resolve) => { resolve(); }).then(() => true);
    }
    return new Promise((resolve) => {
      updateMessage(<FormattedMessage id="invalidFormDataMsg" />);
      resolve();
    })
      .then(() => false);
  }

  render() {
    const { stepEditorOpen } = this.props.dialogManager;
    const { toggleStepEditor } = this.props.actions;
    return (
      <FormDialog
        title={<FormattedMessage id="stepEditorTitle" />}
        hints={<FormattedMessage id="stepEditorHint" />}
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
  actions: bindActionCreators({
    ...dialogActions,
    ...snackbarActions,
    ...taskActions,
    ...graphActions,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(StepEditorDialogContainer);
