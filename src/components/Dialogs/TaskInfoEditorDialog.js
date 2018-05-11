import React from 'react';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import Close from '@material-ui/icons/Close';

import TaskInfo from '../TaskInfo';

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

class TaskInfoEditorDialog extends React.Component {
  handleSaveClick = () => {
    this.props.onSave({ ...this.taskInfoComponent.state });
    this.props.toggleDialog();
  };

  render() {
    const { open, toggleDialog } = this.props;
    return (
      <Dialog
        open={open}
        aria-labelledby="form-dialog-title"
        style={inline.dialogMain}
        fullWidth
      >
        <DialogTitle id="form-dialog-title">
          <span>Task Info</span>
          <IconButton color="default" style={inline.iconButton} onClick={toggleDialog}>
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent style={inline.dialogContent}>
          <DialogContentText>
            <span style={inline.text}>To create a task, please fill in the fields below.</span>
          </DialogContentText>
          <TaskInfo ref={(el) => { this.taskInfoComponent = el; }} />
        </DialogContent>
        <DialogActions>
          <Button onClick={toggleDialog} color="default">Cancel</Button>
          <Button onClick={this.handleSaveClick} color="primary">Save</Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default TaskInfoEditorDialog;
