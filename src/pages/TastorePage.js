import React from 'react';
import TaskAppActionBarContainer from '../containers/TaskAppActionBarContainer';
import TaskAppCardBoardContainer from '../containers/TaskAppCardBoardContainer';
import TaskAppSearchBar from '../components/TaskAppSearchBar';
import { getTaskApps } from '../utils/api';

class TastorePage extends React.Component {
  componentDidMount = () => {
    getTaskApps();
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

export default TastorePage;
