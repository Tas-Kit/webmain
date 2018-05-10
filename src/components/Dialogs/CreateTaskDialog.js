import React from 'react';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';

const CreateTaskDialog = ({ open, toggleDialog }) => (
  <Dialog
    open={open}
    onClose={toggleDialog}
    aria-labelledby="form-dialog-title"
  >
    <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
    <DialogContent>
      <DialogContentText>
        To subscribe to this website, please enter your email address here. We will send
        updates occasionally.
      </DialogContentText>
      <TextField
        autoFocus
        margin="dense"
        id="name"
        label="Email Address"
        type="email"
        fullWidth
      />
    </DialogContent>
    <DialogActions>
      <Button onClick={toggleDialog} color="primary">
        Cancel
      </Button>
      <Button onClick={toggleDialog} color="primary">
        Subscribe
      </Button>
    </DialogActions>
  </Dialog>
);

export default CreateTaskDialog;
