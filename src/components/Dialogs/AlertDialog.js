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
import { CircularProgress } from 'material-ui/Progress';

// svgs
import Close from '@material-ui/icons/Close';

// constants
import { SECONDARY } from '../../constants/colors';

const inline = {
  text: {
    padding: '0px 24px',
    fontSize: 14,
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
  progress: {
    color: SECONDARY,
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
};

const AlertDialog = (props) => {
  const handleConfirm = () => {
    props.onConfirm()
      .then(() => { props.toggle(); });
  };

  const { openState, message, title, toggle, onConfirm, loading } = props;
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
        <div style={{ position: 'relative' }}>
          <Button
            onClick={handleConfirm}
            color="secondary"
            disabled={loading}
          >
            {!loading && 'Yes'}
          </Button>
          {loading && <CircularProgress size={24} style={inline.progress} />}
        </div>
      </DialogActions>
    </Dialog>
  );
};

export default AlertDialog;
