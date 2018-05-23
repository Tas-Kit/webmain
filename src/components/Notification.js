import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Badge from '@material-ui/core/Badge';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import IconButton from '@material-ui/core/IconButton';
import Close from '@material-ui/icons/Close';
import Done from '@material-ui/icons/Done';
import { FormattedMessage } from 'react-intl';

// svg imports
import NotificationIcon from '@material-ui/icons/Notifications';

// constant import
import { ACCEPTANCE } from '../constants';

const styles = {
  notificationIcon: {
    width: 40,
    height: 40,
  },
  typography: {
    margin: '1em',
  },
};

class Notification extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isNotificationListOpen: false,
    };
    this.anchorEl = React.createRef();
  }

  handleNotificationClick = () => {
    this.setState({
      isNotificationListOpen: true,
    });
  }


  handleClose = () => {
    this.setState({
      isNotificationListOpen: false,
    });
  }

  render() {
    const {
      classes, tasks, handleAcceptClick, handleRejectClick,
    } = this.props;
    const waitingTasks = tasks.filter(task => task.permission.acceptance === ACCEPTANCE.WAITING);

    return (
      <div ref={this.anchorEl}>
        {
          waitingTasks.length > 0 ?
            (
              <Badge badgeContent={waitingTasks.length} color="secondary">
                <NotificationIcon
                  className={classes.notificationIcon}
                  onClick={this.handleNotificationClick}
                />
              </Badge>
            ) :
            (
              <NotificationIcon
                className={classes.notificationIcon}
                onClick={this.handleNotificationClick}
              />
            )
        }
        <Popover
          open={this.state.isNotificationListOpen}
          onClose={this.handleClose}
          anchorEl={this.anchorEl ? this.anchorEl.current : null}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >

          <List >
            {waitingTasks.map((task) => {
              const { tid, name } = task.info;
              return (
                <ListItem key={tid} >
                  <p>
                    <FormattedMessage
                      id="invitationNotification"
                      defaultMessage="You are invited to join {taskName}"
                      values={{
                        taskName: <b>{name}</b>,
                      }}
                    />
                  </p>
                  <IconButton
                    aria-label="Accept"
                    color="primary"
                    onClick={handleAcceptClick(tid)}
                  >
                    <Done />
                  </IconButton>
                  <IconButton
                    aria-label="Reject"
                    color="secondary"
                    onClick={handleRejectClick(tid)}
                  >
                    <Close />
                  </IconButton>
                </ListItem>
              );
            })
            }
          </List>
        </Popover>
      </div>
    );
  }
}

export default withStyles(styles)(Notification);
