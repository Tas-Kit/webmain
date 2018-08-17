import { connect } from 'react-redux';
import TaskAppActionBar from '../components/TaskAppActionBar';
import { toggleIsCreator } from '../actions/taskAppActions';
import { toggleTaskAppCreator } from '../actions/dialogActions';

const mapStateToProps = ({ taskAppManager }) => {
  const { isCreatorMode } = taskAppManager;
  return {
    isCreatorMode,
  };
};

const mapDispatchToProps = dispatch => ({
  handleCreatorSwitchChange: () => {
    dispatch(toggleIsCreator());
  },
  handleCreateAppClick: () => {
    dispatch(toggleTaskAppCreator());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(TaskAppActionBar);

