import React from 'react';
import { connect } from 'react-redux';
import TaskAppActionBar from '../components/TaskAppActionBar';
import { toggleIsCreator } from '../actions/taskAppActions';

const mapStateToProps = ({ taskAppManager }) => {
  const { isCreatorMode } = taskAppManager;
  return {
    isCreatorMode,
  };
};

const mapDispatchToProps = dispatch => ({
  handleCreatorSwitchChange: () => {
    dispatch(toggleIsCreator());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(TaskAppActionBar);

