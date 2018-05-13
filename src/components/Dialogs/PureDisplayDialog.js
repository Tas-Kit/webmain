import React from 'react';

// mui components
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
    fontSize: 13,
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

const PureDisplayDialog = props => {
  const {
    open, toggle, component, title, hints,
  } = props;
  return (
    <Dialog
      open={open}
      fullWidth
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">
        <span>{title}</span>
        <IconButton color="default" style={inline.iconButton} onClick={toggle}>
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent style={inline.dialogContent}>
        <DialogContentText>
          <span style={inline.text}>{hints}</span>
        </DialogContentText>
        {component}
      </DialogContent>
    </Dialog>
  );
};

export default PureDisplayDialog;
