import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FormattedMessage } from 'react-intl';

// redux actions
import * as taskActions from '../actions/taskActions';

const inline = {
  instructions: {
    marginLeft: 20,
    marginTop: 20,
    fontSize: 16,
  },
};

const TasksPage = () => (
  <div style={inline.instructions}>
    <FormattedMessage id="welcomeMessage" defaultMessage="" />
  </div>
);

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ ...taskActions }, dispatch),
});

export default connect(null, mapDispatchToProps)(TasksPage);
