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
import * as snackbarActions from '../actions/snackbarActions';

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

  componentWillUnmount() {
    this.props.actions.updateAid('');
  }

  handlePasswordChange = (e) => {
    this.setState({ password: e.target.value });
  }

  handleSubmit = () => {
    const { toggleMiniAppPassword, updateMessage } = this.props.actions;
    const { username } = this.props.currentUserManager;
    const { password } = this.state;
    const data = {
      username,
      password,
    };
    API.sendRequest(AUTHENTICATE_USER_URL, apiTypes.AUTHENTICATE_USER, data, 'POST', 'formData')
      .then((success) => {
        if (success) {
          toggleMiniAppPassword();

          const { aid } = this.props.miniAppManager;
          if (aid !== '') {
            // Continue to open a new url of the mini app
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
          } else {
            // continue to render some components in step info
            const { cmpInfo } = this.props.stepManager;
            console.log(cmpInfo);
            const keys = Object.keys(cmpInfo.components);
            console.log(keys);
            const components = [];
            for (let i = 0; i < keys.length; i++) {
              const key = keys[i];
              components.push(cmpInfo.components[key]);
            }
            const url = `http://sandbox.tas-kit.com/web/app/${components[0].app}/component/${components[0].cmp}.js`;
            fetch(url, {
              headers: { Accept: 'application/json' },
              credentials: 'include',
              method: 'GET',
              withCredentials: true,
            })
              .then(res => {
                console.log(res);
              })
              // .then((json) => {
              //   console.log(json);
              // });
          }
        } else {
          updateMessage(<FormattedMessage id="miniAppPasswordWrong" />);
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
            type="password"
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
  stepManager: state.stepManager,
  miniAppManager: state.miniAppManager,
  dialogManager: state.dialogManager,
  currentUserManager: state.currentUserManager,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    ...dialogActions,
    ...taskAppActions,
    ...snackbarActions,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(MiniAppPasswordDialogContainer);
