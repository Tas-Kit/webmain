import React from 'react';
import TaskToolbarContainer from '../containers/TaskToolbarContainer';
import GraphViewerContainer from '../containers/GraphViewerContainer';

const TaskGraphPage = () => (
  <div>
    {/* Task Toolbar */}
    <TaskToolbarContainer users={{}} />
    {/* Graph */}
    <GraphViewerContainer />
  </div>
);

export default TaskGraphPage;
