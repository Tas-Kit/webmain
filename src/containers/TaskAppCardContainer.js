import { connect } from 'react-redux';
import TaskAppCard from '../components/TaskAppCard';

const mapStateToProps = (state, ownProps) => {
  const { taskAppManager } = state;
  const { taskAppId } = ownProps;
  return {
    taskApp: taskAppManager.taskApps[taskAppId],
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(TaskAppCard);
