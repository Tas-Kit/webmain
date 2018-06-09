import React from 'react';
import { connect } from 'react-redux';

// ui components
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

// svgs
import Close from '@material-ui/icons/Close';

// constants
import { DIALOG_MESSAGE } from '../../constants';
import { PINK } from '../../constants/colors';

import { LoadingButton } from '../Button';

const inline = {
  text: {
    padding: '0px 24px',
    fontSize: DIALOG_MESSAGE,
  },
  dialogContent: {
    padding: 0,
  },
  iconButton: {
    display: 'inline-block',
    width: 40,
    height: 40,
    minWidth: 'initial',
    minHeight: 'initial',
    borderRadius: '50%',
    float: 'right',
    position: 'relative',
    bottom: 10,
  },
  unsaved: {
    color: PINK,
  },
};

class FormDialog extends React.Component {
  handleSave = () => {
    this.props.onSave()
      .then((success) => {
        if (success) this.props.toggle();
      });
  }

  renderUnsavedChanges = () => {
    const { isEditor } = this.props;
    const { taskInfo, originalTaskInfo } = this.props.taskManager;
    const hasUnsaved = JSON.stringify(originalTaskInfo) !== JSON.stringify(taskInfo);
    if (isEditor && hasUnsaved) {
      return ' (Unsaved changes)';
    }
    return null;
  }

  render() {
    const {
      openState,
      toggle,
      component,
      title,
      hints,
      loading,
      disableButtons,
    } = this.props;

    return (
      <Dialog
        open={openState}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          <span>{title}</span>
          <span style={inline.unsaved}>{this.renderUnsavedChanges()}</span>
          <IconButton
            color="default"
            style={inline.iconButton}
            onClick={toggle}
            disabled={loading}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent style={inline.dialogContent}>
          <DialogContentText>
            <span style={inline.text}>{hints}</span>
          </DialogContentText>
          {component}
        </DialogContent>
        {!disableButtons ?
          <DialogActions>
            <Button
              onClick={toggle}
              color="default"
              disabled={loading}
            >
              Cancel
            </Button>
            <LoadingButton
              buttonName="Save"
              color="primary"
              loading={loading}
              onClick={this.handleSave}
            />
          </DialogActions>
          : null
        }
      </Dialog>
    );
  }
}

FormDialog.defaultProps = {
  isEditor: false,
  hints: '',
  disableButtons: false,
  loading: false,
};

const mapStateToProps = ({ taskManager }) => ({
  taskManager,
});

export default connect(mapStateToProps)(FormDialog);
