import { connect } from 'react-redux';
import TaskAppCardBoard from '../components/TaskAppCardBoard';
import { toggleTaskAppCreator } from '../actions/dialogActions';

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
});

export default connect(mapStateToProps, mapDispatchToProps)(TaskAppCardBoard);
