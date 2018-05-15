import React, { Children } from 'react';

// mui components
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import { DIALOG_MESSAGE } from "../../constants";

// svgs
import Close from '@material-ui/icons/Close';

const inline = {
  text: {
    padding: '0px 24px',
    fontSize: DIALOG_MESSAGE,
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
    open, toggle, title, children, hints
  } = props;
  return (
    <Dialog open={open} fullWidth aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">
        <span>{title}</span>
        <IconButton color="default" style={inline.iconButton} onClick={toggle}>
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        {hints && (
          <DialogContentText>
            <span style={inline.text}>{hints}</span>
          </DialogContentText>
        )}
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default PureDisplayDialog;
