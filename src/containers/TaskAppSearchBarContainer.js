import { connect } from 'react-redux';
import TaskAppSearchBar from '../components/TaskAppSearchBar';

const mapStateToProps = ({ taskAppManager, currentUserManager }) => ({
  isCreatorMode: taskAppManager.isCreatorMode,
  uid: currentUserManager.uid,
});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(TaskAppSearchBar);
