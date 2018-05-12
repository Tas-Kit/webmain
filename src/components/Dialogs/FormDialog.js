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

// react components
import TaskInfoContainer from '../../containers/TaskInfoContainer';

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

class FormDialog extends React.Component {
  handleSave = () => {
    this.props.toggle();
  }

  render() {
    const { open, toggle } = this.props;
    return (
      <Dialog
        open={open}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          <span>Task Info</span>
          <IconButton color="default" style={inline.iconButton} onClick={toggle}>
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent style={inline.dialogContent}>
          <DialogContentText>
            <span style={inline.text}>To create a task, please fill in the fields below.</span>
          </DialogContentText>
          <TaskInfoContainer />
        </DialogContent>
        <DialogActions>
          <Button onClick={toggle} color="default">Cancel</Button>
          <Button onClick={this.handleSave} color="primary">Save</Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default FormDialog;
