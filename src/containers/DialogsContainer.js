import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// ui components
import { FormDialog } from '../components/Dialogs';

// ui containers
import TaskInfoContainer from './TaskInfoContainer';
import StepInfoContainer from './StepInfoContainer';

// redux actions
import * as dialogActions from '../actions/dialogActions';

const DialogsContainer = (props) => {
  const { taskInfoOpen, stepInfoOpen } = props.dialogManager;
  const { toggleTaskInfo, toggleStepInfo } = props.actions;
  return (
    <div>
      {/* Task Info Form */}
      <FormDialog
        title="Task Info"
        hints="To create a task, please fill in the fields below."
        open={taskInfoOpen}
        toggle={toggleTaskInfo}
        component={<TaskInfoContainer />}
      />

      {/* Step Info Form */}
      <FormDialog
        title="Step Info"
        hints="To create a step, please fill in the fields below."
        open={stepInfoOpen}
        toggle={toggleStepInfo}
        component={<StepInfoContainer />}
      />
    </div>
  );
};

const mapStateToProps = ({ dialogManager }) => ({ dialogManager });

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ ...dialogActions }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(DialogsContainer);
