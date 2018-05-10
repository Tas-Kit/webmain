import React from 'react';
import { BottomPanel } from '../components/Drawer';
import { CreateTaskDialog } from '../components/Dialogs';

class DrawerBottomPanelContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      createTaskOpen: false,
    };
  }

  toggleDialog = () => { this.setState({ createTaskOpen: !this.state.createTaskOpen }); }

  handleTaskInfoSave = (taskInfo = {}) => {
    const {
      name,
      status,
      deadline,
      time,
      timeUnit,
      description,
      roles,
    } = taskInfo;

    const requestObject = {
      name,
      status,
      deadline,
      time,
      timeUnit,
      description,
      roles,
    };

    console.log(requestObject);
  }

  render() {
    const { createTaskOpen } = this.state;
    return (
      <div>
        <BottomPanel toggleDialog={this.toggleDialog} />
        <CreateTaskDialog
          open={createTaskOpen}
          toggleDialog={this.toggleDialog}
          onSave={this.handleTaskInfoSave}
        />
      </div>
    );
  }
}

export default DrawerBottomPanelContainer;
