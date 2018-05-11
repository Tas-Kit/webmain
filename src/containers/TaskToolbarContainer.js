import React from 'react';
import TaskToolbar from '../components/TaskToolbar';
import TaskInvitationDialog from '../components/Dialogs/TaskInvitationDialog';

class DrawerBottomPanelContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      isInvitationOpen: false,
    };
  }

  openDialog = () => {
    this.setState({
      isInvitationOpen: true,
    });
  }

  closeDialog = () => {
    this.setState({
      isInvitationOpen: false,
    });
  }

  handleInvitationClick = id => () => {
    // todo: wire it up with acutal api
  };

  render() {
    const { isInvitationOpen } = this.state;
    const { users } = this.props;
    return (
      <div>
        <TaskToolbar users={users} handleInvitationClick={this.openDialog} />
        <TaskInvitationDialog
          open={isInvitationOpen}
          onClose={this.closeDialog}
          users={users}
          handleInvitationClick={this.handleInvitationClick}
        />
      </div>
    );
  }
}

export default DrawerBottomPanelContainer;
