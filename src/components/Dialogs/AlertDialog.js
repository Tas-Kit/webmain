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
  dialogContentText: {
    margin: '0px 0px 18px 0px',
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

const AlertDialog = (props) => {
  const handleConfirm = () => {
    props.onConfirm()
      .then(() => { props.toggle(); });
  };

  const {
    openState,
    message,
    title,
    toggle,
    loading,
  } = props;

  return (
    <Dialog
      open={openState}
      aria-labelledby="alert-dialog-title"
    >
      <DialogTitle id="alert-dialog-title">
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
        <DialogContentText style={inline.dialogContentText}>
          <span style={inline.text}>{message}</span>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={toggle} color="default" disabled={loading}>No</Button>
        <LoadingButton
          buttonName="Yes"
          color="secondary"
          loading={loading}
          onClick={handleConfirm}
        />
      </DialogActions>
    </Dialog>
  );
};

export default AlertDialog;
