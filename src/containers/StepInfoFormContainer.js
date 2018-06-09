import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import StepInfoForm from '../components/StepInfoForm';

// redux actions
import * as stepActions from '../actions/stepActions';

class StepInfoFormContainer extends React.Component {
  componentDidMount = () => {
    const { stepInfo } = this.props.stepManager;
    this.props.actions.setStepInfoOrigin(stepInfo);
  }

  render = () => {
    const { stepInfo, isStartEnd } = this.props.stepManager;
    const { roles } = this.props.taskManager.taskInfo;
    const { updateStepInfo } = this.props.actions;
    return (
      <StepInfoForm
        roles={roles}
        info={stepInfo}
        update={updateStepInfo}
        isStartEnd={isStartEnd}
      />
    );
  }
}

const mapStateToProps = ({ taskManager, stepManager, dialogManager }) => ({
  taskManager,
  stepManager,
  dialogManager,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(stepActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(StepInfoFormContainer);
