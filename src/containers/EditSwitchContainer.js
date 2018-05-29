import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Switch } from '../components/Switch';

import * as currentUserActions from '../actions/currentUserActions';

const EditSwitchContainer = (props) => {
  const { editMode } = props.currentUserManager;
  const { toggleEditMode } = props.actions;
  return (
    <Switch
      label="Editor"
      checked={editMode}
      onChange={toggleEditMode}
    />
  );
};

const mapStateToProps = ({ currentUserManager }) => ({
  currentUserManager,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(currentUserActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditSwitchContainer);
