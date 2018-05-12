import React from 'react';
import TaskToolbar from '../components/TaskToolbar';
import TaskInvitationDialog from '../components/Dialogs/TaskInvitationDialog';


class TaskToolbarContainer extends React.Component {
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
    // todo: wire it up with actual api
  };

  handleRevokeInvitationClick = id => () => {
    // todo: wire it up with actual api
  };

  render() {
    const { isInvitationOpen } = this.state;
    const { users, roles } = this.props;
    return (
      <div>
        <TaskToolbar users={users} handleInvitationClick={this.openDialog} />
        <TaskInvitationDialog
          open={isInvitationOpen}
          onClose={this.closeDialog}
          users={users}
          roles={roles}
          handleInvitationClick={this.handleInvitationClick}
          handleRevokeInvitationClick={this.handleRevokeInvitationClick}
        />
      </div>
    );
  }
}

export default TaskToolbarContainer;
