import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// ui components
import { FormDialog } from '../components/Dialogs';

// redux actions
import * as dialogActions from '../actions/dialogActions';

const DialogsContainer = (props) => {
  const { taskInfoOpen } = props.dialogManager;
  const { toggleFormDialog } = props.actions;
  return (
    <div>
      {/* Task Info Form */}
      <FormDialog open={taskInfoOpen} toggle={toggleFormDialog} />
    </div>
  );
};

const mapStateToProps = ({ dialogManager }) => ({ dialogManager });

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ ...dialogActions }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(DialogsContainer);
