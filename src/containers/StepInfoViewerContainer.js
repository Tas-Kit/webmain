import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FormattedMessage } from 'react-intl';
import StepInfoView from '../components/StepInfoView';
import API from '../services/APIService';
import * as apiTypes from '../constants/apiTypes';
import * as snackbarActions from '../actions/snackbarActions';
import * as stepActions from '../actions/stepActions';
import * as dialogActions from '../actions/dialogActions';
import { TASK_TRIGGER_URL, TASK_SERVICE_URL } from '../constants/apiUrls';

class StepInfoViewerContainer extends React.Component {
  componentDidMount() {
    const { stepId } = this.props.stepManager;
    const { taskId } = this.props.taskManager;
    console.log(stepId);

    const url = `${TASK_SERVICE_URL}${taskId}/${stepId}/component/`;
    API.sendRequest(url, apiTypes.GET_STEP_COMPONENT).then((json) => {
      if (json) {
        this.props.actions.updateComponentInfo(json);
        const { platformRootKey } = this.props.currentUserManager;
        if (!platformRootKey) {
          this.props.actions.toggleMiniAppPassword();
        }
        // console.log(json);
        // console.log(json.components);
        // const { app, cmp } = json.components[stepId];
        // console.log(app, cmp);
      }
    });
  }

  getUserIndex = (name) => {
    const { taskUsers } = this.props.taskManager;
    const users = taskUsers.map(user => user.basic.username);
    return users.indexOf(name);
  };

  handleTrigger = () => {
    const { updateMessage, toggleTriggerPending, toggleStepViewer } = this.props.actions;
    const { taskId: tid } = this.props.taskManager;
    const { stepId: sid } = this.props.stepManager;
    const url = `${TASK_TRIGGER_URL}${tid}/`;
    if (sid === null) {
      updateMessage(<FormattedMessage id="cantTriggerMsg" />);
    } else {
      toggleTriggerPending();
      const payload = { tid, sid };
      API.sendRequest(url, apiTypes.TRIGGER, payload, 'POST')
        .then((triggered) => {
          if (triggered) {
            toggleTriggerPending();
            updateMessage(<FormattedMessage id="triggerMsg" />);
            toggleStepViewer();
          }
        })
        .catch(() => {
          toggleTriggerPending();
          updateMessage(<FormattedMessage id="triggerFailMsg" />);
        });
    }
  };

  render() {
    const { stepInfo, triggerPending } = this.props.stepManager;
    const { taskUsers } = this.props.taskManager;

    // user's role in this task
    const { username } = this.props.currentUserManager;
    const userIndex = this.getUserIndex(username);
    let userTaskRole = null;
    if (userIndex >= 0) {
      userTaskRole = taskUsers[userIndex].has_task.role;
    }

    return (
      <StepInfoView
        info={stepInfo}
        userTaskRole={userTaskRole}
        onTrigger={this.handleTrigger}
        triggerPending={triggerPending}
      />
    );
  }
}

const mapStateToProps = store => ({
  taskManager: store.taskManager,
  stepManager: store.stepManager,
  dialogManager: store.dialogManager,
  currentUserManager: store.currentUserManager,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ ...snackbarActions, ...stepActions, ...dialogActions }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(StepInfoViewerContainer);
