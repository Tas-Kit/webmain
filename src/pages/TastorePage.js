import React from 'react';
import { connect } from 'react-redux';
import TaskAppActionBarContainer from '../containers/TaskAppActionBarContainer';
import TaskAppCardBoardContainer from '../containers/TaskAppCardBoardContainer';
import TaskAppSearchBar from '../components/TaskAppSearchBar';
import { getTaskApps } from '../utils/api';


class TastorePage extends React.Component {
  componentDidMount() {
    this.fetchTaskApps();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isCreatorMode !== this.props.isCreatorMode) {
      this.fetchTaskApps();
    }
  }

  fetchTaskApps() {
    const { isCreatorMode, uid } = this.props;
    if (isCreatorMode) getTaskApps(null, uid);
    else getTaskApps();
  }


  render() {
    return (
      <div >
        <TaskAppActionBarContainer />
        <TaskAppSearchBar />
        <TaskAppCardBoardContainer />
      </div>
    );
  }
}

const mapStateToProps = ({ taskAppManager, currentUserManager }) => {
  const { isCreatorMode } = taskAppManager;
  const { uid } = currentUserManager;
  return ({
    isCreatorMode,
    uid,
  });
};

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(TastorePage);
