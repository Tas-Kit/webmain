import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// redux actions
import * as taskActions from '../actions/taskActions';

const inline = {
  instructions: {
    fontWeight: 300,
    marginLeft: 20,
    marginTop: 20,
    fontSize: 20,
  },
};

class TasksPage extends React.Component {
  componentDidMount = () => {
    this.props.actions.resetTaskInfo();
  }

  render() {
    return (
      <div style={inline.instructions}>
        Please select a task.
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ ...taskActions }, dispatch),
});

export default connect(null, mapDispatchToProps)(TasksPage);
