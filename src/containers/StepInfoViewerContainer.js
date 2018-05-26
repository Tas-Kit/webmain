import React from 'react';
import { connect } from 'react-redux';
import StepInfoView from '../components/StepInfoView';

const StepInfoViewerContainer = (props) => {
  const { stepInfo } = props.stepManager;
  const { roles } = props.taskManager.taskInfo;
  return (
    <StepInfoView
      roles={roles}
      info={stepInfo}
    />
  );
};

const mapStateToProps = ({ taskManager, stepManager, dialogManager }) => ({
  taskManager,
  stepManager,
  dialogManager,
});

export default connect(mapStateToProps)(StepInfoViewerContainer);
