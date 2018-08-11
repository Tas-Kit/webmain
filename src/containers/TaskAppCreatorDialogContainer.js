import React from 'react';
import { connect } from 'react-redux';
import { FormDialog } from '../components/Dialogs';
import { toggleTaskAppCreator } from '../actions/dialogActions';

class TaskAppCreatorDialogContainer extends React.Component {
  handleTaskAppSave = () => {

  }
  render() {
    const { taskAppCreatorOpen, toggleTaskAppCreatorFunction } = this.props;
    return (<FormDialog
      title="Create Task App"
      openState={taskAppCreatorOpen}
      toggle={toggleTaskAppCreatorFunction}
      onSave={this.handleTaskAppSave}
      loading={false}
    />);
  }
}

const mapStateToProps = ({ dialogManager }) => {
  const { taskAppCreatorOpen } = dialogManager;
  return {
    taskAppCreatorOpen,
  };
};

const mapDispatchToProps = dispatch => ({
  toggleTaskAppCreatorFunction: () => dispatch(toggleTaskAppCreator()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TaskAppCreatorDialogContainer);
