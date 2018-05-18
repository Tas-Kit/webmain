import React from 'react';

// ui components
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';

// svgs
import Close from '@material-ui/icons/Close';

// constants
import { DIALOG_MESSAGE } from '../../constants';

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
};

class FormDialog extends React.Component {
  handleSave = () => {
    this.props.onSave()
      .then((success) => {
        if (success) this.props.toggle();
      });
  }

  render() {
    const {
      openState,
      toggle,
      component,
      title,
      hints,
      loading,
    } = this.props;

    return (
      <Dialog
        open={openState}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          <span>{title}</span>
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
      </Dialog>
    );
  }
}

export default FormDialog;
