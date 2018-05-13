import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SnackMessageBar from '../components/SnackMessageBar';

import * as snackbarActions from '../actions/snackbarActions';

const SnackbarContainer = (props) => {
  const { message, open } = props.snackbarManager;
  const { toggleSnackbar } = props.actions;
  return (
    <SnackMessageBar message={message} openState={open} toggle={toggleSnackbar} />
  );
};

const mapStateToProps = ({ snackbarManager }) => ({ snackbarManager });

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(snackbarActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(SnackbarContainer);
