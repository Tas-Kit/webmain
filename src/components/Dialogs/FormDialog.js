import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

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

// redux actions
import * as dialogActions from '../../actions/dialogActions';

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
  handleSaveClick = () => {
    this.props.actions.toggleFormDialog();
  }

  render() {
    const { taskInfoOpen } = this.props.dialogManager;
    const { toggleFormDialog } = this.props.actions;
    return (
      <Dialog
        open={taskInfoOpen}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          <span>Task Info</span>
          <IconButton color="default" style={inline.iconButton} onClick={toggleFormDialog}>
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
          <Button onClick={toggleFormDialog} color="default">Cancel</Button>
          <Button onClick={this.handleSaveClick} color="primary">Save</Button>
        </DialogActions>
      </Dialog>
    );
  }
}

const mapStateToProps = ({ dialogManager }) => ({ dialogManager });

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ ...dialogActions }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(FormDialog);
