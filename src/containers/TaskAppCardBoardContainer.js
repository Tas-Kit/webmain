import { connect } from 'react-redux';
import TaskAppCardBoard from '../components/TaskAppCardBoard';

const mapStateToProps = (state) => {
  const { taskAppManager } = state;
  return ({
    taskAppIds: taskAppManager.currentTaskAppIds,
  });
};

const mapDispatchToProps = {

};


export default connect(mapStateToProps, mapDispatchToProps)(TaskAppCardBoard);
