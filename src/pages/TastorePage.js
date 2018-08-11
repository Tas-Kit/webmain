import React from 'react';
import TaskAppActionBarContainer from '../containers/TaskAppActionBarContainer';

class TastorePage extends React.Component {
  constructor(props) {
    super(props);
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
