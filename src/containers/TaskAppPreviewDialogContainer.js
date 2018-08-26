import React from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import PureDisplayDialog from '../components/Dialogs/PureDisplayDialog';
import TaskAppPreviewViewer from '../components/TaskAppPreviewViewer';
import { toggleTaskAppPreview } from '../actions/dialogActions';
import { updateMessage } from '../actions/snackbarActions';
import { downloadTaskApp, previewTaskApp, getTask } from '../utils/api';

class TaskAppPreviewDialogContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      task: null,
      isLoading: false,
      isError: false,
    };
  }
  componentDidUpdate(prevProps) {
    const { isOpen, appId } = this.props;
    if (prevProps.isOpen !== isOpen) {
      if (!isOpen) {
        this.setState({ task: null });
      } else if (appId) {
        this.setState({ isLoading: true });
        previewTaskApp(appId)
          .then(json => this.setState({
            task: json.task,
          }))
          .catch(() => this.setState({ isError: true }))
          .finally(() => {
            this.setState({ isLoading: false });
          });
      }
    }
  }
  handleDownloadClick = aid => (e) => {
    e.stopPropagation();
    downloadTaskApp(aid)
      .then(() => {
        updateMessage('You have successfully download the task app.');
        return getTask();
      })
      .catch(() => updateMessage('Network Error'));
  }
  render() {
    const { isOpen, handleToggle, appId } = this.props;
    const { task, isLoading, isError } = this.state;
    return (
      <PureDisplayDialog
        title={<FormattedMessage id="taskAppPreviewTitle" />}
        open={isOpen}
        toggle={handleToggle}
      >
        {isLoading ? <p>Loading</p> : <TaskAppPreviewViewer task={task} handleDownloadClick={this.handleDownloadClick(appId)} />}
        {isError && <p>Network Error</p>}
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
