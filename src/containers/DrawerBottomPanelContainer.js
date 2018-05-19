import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { BottomPanel } from '../components/Drawer';

// redux actions
import * as dialogActions from '../actions/dialogActions';
import * as taskActions from '../actions/taskActions';

const DrawerBottomPanelContainer = (props) => {
  const { toggleTaskCreator, resetTaskInfo } = props.actions;
  return (
    <BottomPanel
      toggleTaskCreator={toggleTaskCreator}
      resetTaskInfo={resetTaskInfo}
    />
  );
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ ...dialogActions, ...taskActions }, dispatch),
});

export default connect(null, mapDispatchToProps)(DrawerBottomPanelContainer);
