import React from 'react';
import TaskAppActionBarContainer from '../containers/TaskAppActionBarContainer';
import TaskAppCardBoardContainer from '../containers/TaskAppCardBoardContainer';
import { getTaskApps } from '../utils/api';

class TastorePage extends React.Component {
  componentDidMount = () => {
    getTaskApps();
  }

  render() {
    return (
      <div >
        <TaskAppActionBarContainer />
        <TaskAppCardBoardContainer />
      </div>
    );
  }
}

export default TastorePage;
