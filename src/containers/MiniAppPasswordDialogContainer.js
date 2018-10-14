import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FormattedMessage } from 'react-intl';
import Button from '@material-ui/core/Button';
import { FormDialog } from '../components/Dialogs';
import TextInput from '../components/TextInput';

import * as dialogActions from '../actions/dialogActions';

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
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(dialogActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(MiniAppPasswordDialogContainer);
