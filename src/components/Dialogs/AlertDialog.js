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

const inline = {
  text: {
    padding: '0px 24px',
    fontSize: 16,
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

const AlertDialog = (props) => {
  const handleConfirm = () => {
    props.onConfirm();
    props.toggle();
  };

  const { openState, message, title, toggle, onConfirm } = props;
  return (
    <Dialog
      open={openState}
      aria-labelledby="alert-dialog-title"
    >
      <DialogTitle id="alert-dialog-title">
        <span>{title}</span>
        <IconButton color="default" style={inline.iconButton} onClick={toggle}>
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent style={inline.dialogContent}>
        <DialogContentText>
          <span style={inline.text}>{message}</span>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={toggle} color="default">No</Button>
        <Button onClick={handleConfirm} color="secondary">Yes</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AlertDialog;
