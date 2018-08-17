import { connect } from 'react-redux';
import TaskSelect from '../components/TaskSelect';

const mapStateToProps = ({ taskManager }) => {
  const { tasks } = taskManager;
  return {
    tasks,
  };
};

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(TaskSelect);
