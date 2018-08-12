import { connect } from 'react-redux';
import TaskAppCardBoard from '../components/TaskAppCardBoard';
import { toggleTaskAppCreator, toggleTaskAppPreview } from '../actions/dialogActions';

const mapStateToProps = (state) => {
  const { taskAppManager } = state;
  return ({
    taskAppIds: taskAppManager.currentTaskAppIds,
    isCreatorMode: taskAppManager.isCreatorMode,
  });
};

const mapDispatchToProps = dispatch => ({
  showUpdateDialog: (aid) => {
    dispatch(toggleTaskAppCreator(aid));
  },
  showPreviewDialog: (aid) => {
    dispatch(toggleTaskAppPreview(aid));
  },

});

export default connect(mapStateToProps, mapDispatchToProps)(TaskAppCardBoard);
