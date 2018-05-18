import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { BottomPanel } from '../components/Drawer';

// redux actions
import * as dialogActions from '../actions/dialogActions';

const DrawerBottomPanelContainer = (props) => {
  const { toggleTaskInfoCreator } = props.actions;
  return (
    <BottomPanel toggleTaskInfoCreator={toggleTaskInfoCreator} />
  );
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ ...dialogActions }, dispatch),
});

export default connect(null, mapDispatchToProps)(DrawerBottomPanelContainer);
