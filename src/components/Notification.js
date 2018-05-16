import React from 'react';
import { withStyles } from 'material-ui/styles';
import { Popover } from 'material-ui';
import Badge from 'material-ui/Badge';
import List, { ListItem, ListItemText, ListItemSecondaryAction } from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import Close from '@material-ui/icons/Close';
import Done from '@material-ui/icons/Done';


// svg imports
import NotificationIcon from '@material-ui/icons/Notifications';

// constant import
import { ACCEPTANCE } from '../constants';
import { FormattedMessage } from 'react-intl';

const styles = {
  NotificationIcon: {
    width: 44,
  },
};

const sampleData = [
  {
    info: {
      status: 'n',
      description: 'a test project',
      roles: [],
      deadline: '2018-05-15T09:24:36.961000Z',
      expected_effort_unit: null,
      tid: '0af0249fe73e4eea95801895bc9e1834',
      expected_effort_num: null,
      id: 667,
      name: 'test',
    },
    permission: {
      acceptance: ACCEPTANCE.WAITING,
      role: null,
      id: 566,
      super_role: 10,
    },
  },
];

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
    const tasks = sampleData;
    const { classes } = this.props;
    const watingTasks = tasks.filter(task => task.permission.acceptance === ACCEPTANCE.WAITING);

    return (
      <div ref={this.anchorEl}>
        {
          watingTasks.length > 0 ?
            (
              <Badge badgeContent={watingTasks.length} color="secondary">
                <NotificationIcon
                  className={classes.NotificationIcon}
                  onClick={this.handleNotificationClick}
                />
              </Badge>
            ) :
            (
              <NotificationIcon
                className={classes.NotificationIcon}
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
            {watingTasks.map((task) => {
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
                  <IconButton aria-label="Accept" color="primary">
                    <Done />
                  </IconButton>
                  <IconButton aria-label="Reject" color="secondary">
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
