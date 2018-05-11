import React from 'react';
import { BottomPanel } from '../components/Drawer';
import { TaskInfoEditorDialog } from '../components/Dialogs';

class DrawerBottomPanelContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      createTaskOpen: false,
    };
  }

  toggleDialog = () => { this.setState({ createTaskOpen: !this.state.createTaskOpen }); }

  handleTaskInfoSave = (taskInfo = {}) => {
    console.log(taskInfo);
    // TODO: add validation for all fields before sending data, will add it when connecting api
  }

  render() {
    const { createTaskOpen } = this.state;
    return (
      <div>
        <BottomPanel toggleDialog={this.toggleDialog} />
        <TaskInfoEditorDialog
          open={createTaskOpen}
          toggleDialog={this.toggleDialog}
          onSave={this.handleTaskInfoSave}
        />
      </div>
    );
  }
}

export default DrawerBottomPanelContainer;
