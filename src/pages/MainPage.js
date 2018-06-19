import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Route, Switch } from 'react-router-dom';

// pages
import TasksPage from './TasksPage';
import TaskGraphPage from './TaskGraphPage';

// containers
import DialogsContainer from '../containers/DialogsContainer';
import TaskPanelContainer from '../containers/TaskPanelContainer';
import TaskAppBarContainer from '../containers/TaskAppBarContainer';
import SnackbarContainer from '../containers/SnackbarContainer';

// services
import APIService from '../services/APIService';

// actions
import * as snackbarActions from '../actions/snackbarActions';

// constants
import * as apiTypes from '../constants/apiTypes';
import { MIN_ALLOW_WINDOW_WIDTH } from '../constants';
import { TASK_GET_URL, USER_SERVICE_URL } from '../constants/apiUrls';

const styles = {
  taskView: {
    display: 'flex',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    minWidth: MIN_ALLOW_WINDOW_WIDTH,
  },
};

class MainPage extends React.Component {
  componentDidMount = () => {
    const url = TASK_GET_URL;
    APIService.sendRequest(url, apiTypes.GET_TASKS)
      .then(() => {
      })
      .catch(() => {
        this.props.actions.updateMessage('Get tasks failed.');
      });
    APIService.sendRequest(USER_SERVICE_URL, 'get_current_user')
      .then((success) => {
        console.log('get_user api succeed', success);
      })
      .catch(() => {
        this.props.actions.updateMessage('Get user failed');
      });
  };

  render() {
    return (
      <div style={styles.taskView}>
        <TaskPanelContainer />
        <div style={styles.content}>
          <TaskAppBarContainer />

          {/* Routes */}
          <Switch>
            <Route exact path="/" component={TasksPage} />
            <Route path="/task/:taskId" component={TaskGraphPage} />
            <Route component={TasksPage} />
          </Switch>
        </div>

        {/* DialogsContainer */}
        <DialogsContainer />

        {/* Snack Bar */}
        <SnackbarContainer />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ ...snackbarActions }, dispatch),
});

export default connect(null, mapDispatchToProps)(MainPage);
