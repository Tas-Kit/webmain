import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import StepInfo from '../components/StepInfo';

// redux actions
import * as dialogActions from '../actions/dialogActions';
import * as stepActions from '../actions/stepActions';

class StepInfoContainer extends React.Component {
  componentDidMount = () => {
    console.log(this.props.actions);
    this.props.actions.resetStepInfo();
  }

  render() {
    const { stepInfo } = this.props.stepManager;
    const { updateStepInfo } = this.props.actions;
    return (
      <StepInfo
        info={stepInfo}
        update={updateStepInfo}
      />
    );
  }
}

const mapStateToProps = ({ stepManager, dialogManager }) => ({
  stepManager,
  dialogManager,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ ...stepActions, ...dialogActions }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(StepInfoContainer);
