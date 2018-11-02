import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';

import TaskPanel from '../components/TaskPanel';
import { baseUrl } from '../services/APIService';
import { stringify } from 'qs';

import * as taskActions from '../actions/taskActions';
import * as currentUserActions from '../actions/currentUserActions';
import * as taskAppActions from '../actions/taskAppActions';
import * as dialogActions from '../actions/dialogActions';

import API from '../services/APIService';
import { MINI_APP_BASE_URL } from '../constants/apiUrls';
import * as apiTypes from '../constants/apiTypes';

class TaskPanelContainer extends React.Component {
  componentDidMount() {
    // mini-app list api
    API.sendRequest(MINI_APP_BASE_URL, apiTypes.GET_MINI_APP_LIST);
  }

  handleFilterChange = (e) => {
    const { setFilter } = this.props.actions;
    setFilter(e.target.value);
  };

  handleOpenMiniApp = (aid, app) => {
    const { key } = this.props.miniAppManager;
    if (key === '') {
      const { toggleMiniAppPassword } = this.props.actions;
      toggleMiniAppPassword('openMiniApp');
      this.props.actions.updateAid(aid);
    } else {
      const { platformRootKey, uid } = this.props.currentUserManager;
      const requestData = { uid };
      const url = `${baseUrl}${MINI_APP_BASE_URL}${aid}/?${stringify(requestData)}`;
      fetch(url, {
        headers: { PlatformRootKey: platformRootKey, Accept: 'application/json' },
        credentials: 'include',
        method: 'GET',
        withCredentials: true,
      }).then(res => res.json())
        .then((json) => {
          const { key, app, aid: appId } = json.mini_app;
          this.props.actions.updateMiniAppKey(key);
          const newUrl = `${window.location.origin.toString()}/web/app/${app}/index.html?#aid=${appId}&key=${key}`;
          window.open(newUrl);
        });
    }
  }

  render() {
    const { tasks, filter } = this.props.taskManager;
    const { username } = this.props.currentUserManager;
    const { latestDownloadTid } = this.props.taskAppManager;
    const { miniAppList } = this.props.miniAppManager;
    const {
      setActiveTaskId, resetEditMode, resetLatestDownloadTid,
    } = this.props.actions;
    return (
      <TaskPanel
        username={username}
        tasks={tasks}
        onTaskClick={setActiveTaskId}
        resetEditMode={resetEditMode}
        filter={filter}
        handleFilterChange={this.handleFilterChange}
        needHighlightTid={latestDownloadTid}
        resetNeedHighlightTid={resetLatestDownloadTid}
        miniAppList={miniAppList}
        openMiniApp={this.handleOpenMiniApp}
      />
    );
  }
}

const mapStateToProps = state => ({
  taskManager: state.taskManager,
  currentUserManager: state.currentUserManager,
  taskAppManager: state.taskAppManager,
  miniAppManager: state.miniAppManager,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    ...taskActions,
    ...currentUserActions,
    ...taskAppActions,
    ...dialogActions,
  }, dispatch),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TaskPanelContainer));
