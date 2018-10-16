import React from 'react';
import { stringify } from 'qs';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FormattedMessage } from 'react-intl';
import Button from '@material-ui/core/Button';
import { FormDialog } from '../components/Dialogs';
import TextInput from '../components/TextInput';
import API, { baseUrl } from '../services/APIService';
import { AUTHENTICATE_USER_URL, MINI_APP_BASE_URL } from '../constants/apiUrls';
import * as apiTypes from '../constants/apiTypes';

import * as dialogActions from '../actions/dialogActions';
import * as taskAppActions from '../actions/taskAppActions';

const inline = {
  main: {
    padding: 25,
    minWidth: 400,
  },
};

class MiniAppPasswordDialogContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      password: '',
    };
  }

  handlePasswordChange = (e) => {
    this.setState({ password: e.target.value });
  }

  handleSubmit = () => {
    const { toggleMiniAppPassword } = this.props.actions;
    toggleMiniAppPassword();
    const { username } = this.props.currentUserManager;
    const { password } = this.state;
    const data = {
      username,
      password,
    };
    API.sendRequest(AUTHENTICATE_USER_URL, apiTypes.AUTHENTICATE_USER, data, 'POST', 'formData')
      .then((success) => {
        if (success) {
          const { aid } = this.props.miniAppManager;
          const { platformRootKey, uid } = this.props.currentUserManager;
          const requestData = { uid };
          const url = `${baseUrl}${MINI_APP_BASE_URL}${aid}/?${stringify(requestData)}`;
          fetch(url, {
            headers: { PlatformRootKey: platformRootKey, Accept: 'application/json' },
            credentials: 'include',
            method: 'GET',
            withCredentials: true,
          })
            .then(res => res.json())
            .then((json) => {
              const { key, app, aid: appId } = json.mini_app;
              this.props.actions.updateMiniAppKey(key);
              const newUrl = `http://sandbox.tas-kit.com/web/app/${app}/index.html#/aid=${appId}&app_root_key=${key}`;
              window.open(newUrl);
            });
        }
      });
  }

  render() {
    const { password } = this.state;
    const { miniAppPasswordOpen } = this.props.dialogManager;
    const { toggleMiniAppPassword } = this.props.actions;
    return (
      <FormDialog
        title="Mini App Authentication"
        hints="Please input your password."
        openState={miniAppPasswordOpen}
        toggle={toggleMiniAppPassword}
        disableButtons
      >
        <main style={inline.main}>
          <TextInput
            id="mini-app-username"
            width={200}
            value={password}
            onChange={this.handlePasswordChange}
          />
          <Button
            onClick={this.handleSubmit}
            color="primary"
          >
            <FormattedMessage id="confirmButton" />
          </Button>
        </main>
      </FormDialog>
    );
  }
}

const mapStateToProps = state => ({
  miniAppManager: state.miniAppManager,
  dialogManager: state.dialogManager,
  currentUserManager: state.currentUserManager,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    ...dialogActions,
    ...taskAppActions,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(MiniAppPasswordDialogContainer);
