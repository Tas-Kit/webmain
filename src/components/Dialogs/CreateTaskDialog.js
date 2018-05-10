import React from 'react';
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';

import TaskInfoContainer from '../../containers/TaskInfoContainer';

const inline = {
  dialogMain: {
    // maxWidth: 0.8 * window.innerWidth,
  },
  text: {
    padding: '0px 24px',
    fontSize: 13,
  },
  dialogContent: {
    padding: 0,
  },
};

const CreateTaskDialog = ({ open, toggleDialog }) => (
  <Dialog
    open={open}
    onClose={toggleDialog}
    aria-labelledby="form-dialog-title"
    style={inline.dialogMain}
    fullWidth
  >
    <DialogTitle id="form-dialog-title">Task Info</DialogTitle>
    <DialogContent style={inline.dialogContent}>
      <DialogContentText>
        <span style={inline.text}>To create a task, please fill in the fields below.</span>
      </DialogContentText>
      <TaskInfoContainer />
    </DialogContent>
    <DialogActions>
      <Button onClick={toggleDialog} color="default">Cancel</Button>
      <Button onClick={toggleDialog} color="secondary">Save</Button>
    </DialogActions>
  </Dialog>
);

export default CreateTaskDialog;
