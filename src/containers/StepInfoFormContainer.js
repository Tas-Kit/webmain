import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import StepInfoForm from '../components/StepInfoForm';

// redux actions
import * as dialogActions from '../actions/dialogActions';
import * as stepActions from '../actions/stepActions';

class StepInfoFormContainer extends React.Component {
  componentDidMount = () => {
    this.props.actions.resetStepInfo();
  }

  render() {
    const { stepInfo } = this.props.stepManager;
    const { roles } = this.props.taskManager.taskInfo;
    const { updateStepInfo } = this.props.actions;
    return (
      <StepInfoForm
        roles={roles}
        info={stepInfo}
        update={updateStepInfo}
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
  actions: bindActionCreators({ ...stepActions, ...dialogActions }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(StepInfoFormContainer);
