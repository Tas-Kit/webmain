import React from 'react';
import TaskAppActionBarContainer from '../containers/TaskAppActionBarContainer';
import { getTaskApps } from '../utils/api';

class TastorePage extends React.Component {
  componentDidMount = () => {
    getTaskApps();
  }

  render() {
    return (
      <div >
        <TaskAppActionBarContainer />
      </div>
    );
  }
}

export default TastorePage;
