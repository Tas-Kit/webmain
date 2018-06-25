import React from 'react';
import shortid from 'shortid';
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
import { NORMAL_NODE, NODE_STATUS_COLOR_MAP } from '../constants/nodes';
import { mapStepInfoToNode } from '../utils/functions';
import * as svgStrings from '../assets/svgStrings';

class StepCreatorDialogContainer extends React.Component {
  handleStepInfoSave = () => {
    // add node
    const { stepInfo } = this.props.stepManager;
    const { canvasCoord } = this.props.graphManager;
    const { updateMessage } = this.props.actions;
    const validation = new Validator(stepInfo, STEP_INFO_RULE);
    if (validation.passes()) {
      const color = NODE_STATUS_COLOR_MAP[STATUS_MAP[stepInfo.status]];
      const svgString = svgStrings[NORMAL_NODE](color);
      const imageUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgString)}`;
      const stepNode = {
        ...stepInfo,
        id: shortid.generate(),
        x: canvasCoord.x,
        y: canvasCoord.y,
        node_type: NORMAL_NODE, // current only NORMAL_NODE is available
        image: imageUrl,
      };
      const nodeToAdd = mapStepInfoToNode(stepNode);
      gs.addNode(nodeToAdd);
      this.props.actions.updateGraphDataJson(JSON.parse(JSON.stringify(gs.activeData)));
      return new Promise((resolve) => { resolve(); }).then(() => true);
    }
    return new Promise((resolve) => {
      updateMessage(<FormattedMessage id="invalidFormDataMsg" />);
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
        title={<FormattedMessage id="stepCreatorTitle" />}
        hints={<FormattedMessage id="stepCreatorHint" />}
        openState={stepCreatorOpen}
        toggle={toggleStepCreator}
        onSave={this.handleStepInfoSave}
        component={<StepInfoFormContainer />}
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
  actions: bindActionCreators({
    ...dialogActions,
    ...snackbarActions,
    ...taskActions,
    ...graphActions,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(StepCreatorDialogContainer);
