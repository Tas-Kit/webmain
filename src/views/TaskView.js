import React from 'react';
import TaskPanelContainer from '../containers/TaskPanelContainer';
import TaskToolbar from '../components/TaskToolbar';
import TaskAppBar from '../components/TaskAppBar';

const drawerWidth = 240;

const TaskView = () => (
  <div
    style={{
      color: '#424242'
    }}
  >
    <header
      style={{
        position: 'absolute',
        display: 'inline-box',
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth
      }}
    >
      <TaskAppBar taskTitle={'Task'} />
      <TaskToolbar />
    </header>

    <TaskPanelContainer />
  </div>
);

export default TaskView;
