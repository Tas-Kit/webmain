import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import StepInfoForm from '../components/StepInfoForm';

// redux actions
import * as stepActions from '../actions/stepActions';

const StepInfoFormContainer = (props) => {
  const { stepInfo } = props.stepManager;
  const { roles } = props.taskManager.taskInfo;
  const { updateStepInfo } = props.actions;
  return (
    <StepInfoForm
      roles={roles}
      info={stepInfo}
      update={updateStepInfo}
    />
  );
};

const mapStateToProps = ({ taskManager, stepManager, dialogManager }) => ({
  taskManager,
  stepManager,
  dialogManager,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(stepActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(StepInfoFormContainer);
