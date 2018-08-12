import React from 'react';
import { connect } from 'react-redux';
import PureDisplayDialog from '../components/Dialogs/PureDisplayDialog';
import TaskAppPreviewViewer from '../components/TaskAppPreviewViewer';
import { toggleTaskAppPreview } from '../actions/dialogActions';
import { previewTaskApp } from '../utils/api';

class TaskAppPreviewDialogContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      task: null,
    };
  }
  componentDidUpdate(prevProps) {
    const { isOpen, appId } = this.props;
    if (prevProps.isOpen !== isOpen) {
      if (!isOpen) {
        this.setState({ task: null });
      } else if (appId) {
        previewTaskApp(appId)
          .then(json => this.setState({
            task: json.task,
          }));
      }
    }
  }
  render() {
    const { isOpen, handleToggle } = this.props;
    const { task } = this.state;
    return (
      <PureDisplayDialog
        title="Task App Preview"
        open={isOpen}
        toggle={handleToggle}
      >
        <TaskAppPreviewViewer task={task} />
      </PureDisplayDialog>);
  }
}

const mapStateToProps = ({ dialogManager }) => ({
  appId: dialogManager.taskAppPreviewId,
  isOpen: dialogManager.taskAppPreviewOpen,
});

const mapDispatchToProps = dispatch => ({
  handleToggle: () => dispatch(toggleTaskAppPreview()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TaskAppPreviewDialogContainer);
