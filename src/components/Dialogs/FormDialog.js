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
import { PRIMARY } from '../../constants/colors';

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
  buttonWrapper: {
    position: 'relative',
  },
  progress: {
    color: PRIMARY,
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
};

class FormDialog extends React.Component {
  handleSave = () => {
    this.props.onSave()
      .then(() => { this.props.toggle(); })
  }

  render() {
    const { openState, toggle, component, title, hints, loading } = this.props;
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
          <div style={inline.buttonWrapper}>
            <Button onClick={this.handleSave} color="primary">
              {!loading && 'Save'}
            </Button>
            {loading && <CircularProgress size={24} style={inline.progress} />}
          </div>
        </DialogActions>
      </Dialog>
    );
  }
}

export default FormDialog;
