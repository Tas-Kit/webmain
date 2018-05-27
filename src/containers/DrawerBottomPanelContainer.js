import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { BottomPanel } from '../components/Drawer';

// redux actions
import * as dialogActions from '../actions/dialogActions';
import * as taskActions from '../actions/taskActions';

import { logout } from '../utils/functions';

const DrawerBottomPanelContainer = (props) => {
  const { toggleTaskCreator, resetTaskInfo } = props.actions;
  const handleAddTask = () => {
    resetTaskInfo();
    toggleTaskCreator();
  };
  const handleLogoutClick = () => {
    logout();
  };
  return (
    <BottomPanel
      handleAddTask={handleAddTask}
      handleLogoutClick={handleLogoutClick}
    />
  );
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ ...dialogActions, ...taskActions }, dispatch),
});

export default connect(null, mapDispatchToProps)(DrawerBottomPanelContainer);
