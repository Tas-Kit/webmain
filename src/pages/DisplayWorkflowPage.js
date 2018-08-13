import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import { FormattedMessage } from 'react-intl';

import { LoadingButton } from '../components/Button';

// redux actions
import * as taskActions from '../actions/taskActions';
import * as currentUserActions from '../actions/currentUserActions';
import * as snackbarActions from '../actions/snackbarActions';

// containers
import SnackbarContainer from '../containers/SnackbarContainer';
import PureGraphViewerContainer from '../containers/PureGraphViewerContainer';

// services
import APIService from '../services/APIService';

// constants
import * as apiTypes from '../constants/apiTypes';
import { TASK_GRAPH_URL } from '../constants/apiUrls';

const inline = {
  buttonDiv: {
    marginLeft: 20,
    marginRight: 20,
  },
};

const styles = () => ({
  chip: {
    margin: '0px 2.5px',
  },
  trigger: {
    margin: '10px 0px',
  },
});

class DisplayWorkflowPage extends React.Component {
  constructor() {
    super();
    this.state = {
      displayed: false,
    };
  }

  sendRequest = (taskId) => {
    const url = `${TASK_GRAPH_URL}${taskId}/`;
    APIService.sendRequest(url, apiTypes.GET_TASK_GRAPH)
      .then((success) => {
        if (success) {
          this.setState({ displayed: true });
        } else {
          const { updateMessage, toggleTaskActionPending } = this.props.actions;
          toggleTaskActionPending();
          updateMessage(<FormattedMessage id="noTaskFoundMsg" />);
        }
      });
  }

  handleDisplayGraphClick = () => {
    const { taskId } = this.props.match.params;
    this.props.actions.setActiveTaskId(taskId);
    this.sendRequest(taskId);
  }

  render() {
    const { classes } = this.props;
    const { pending } = this.props.taskManager;
    const { displayed } = this.state;
    return (
      <div>
        {!displayed &&
          <div style={inline.buttonDiv}>
            <LoadingButton
              variant="outlined"
              color="primary"
              className={classes.trigger}
              buttonName={<FormattedMessage id="displayWorkflow" defaultMessage="" />}
              loading={pending}
              onClick={this.handleDisplayGraphClick}
            />
          </div>
        }

        {/* Pure Graph Viewer */}
        {displayed && <PureGraphViewerContainer />}

        {/* Snack Bar */}
        <SnackbarContainer />
      </div>
    );
  }
}

const mapStateToProps = ({ taskManager }) => ({ taskManager });

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ ...taskActions, ...currentUserActions, ...snackbarActions }, dispatch),
});

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(DisplayWorkflowPage));
