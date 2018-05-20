import React from 'react';
import { Link } from 'react-router-dom';

// mui component imports
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Drawer from '@material-ui/core/Drawer';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import grey from '@material-ui/core/colors/grey';
import Tooltip from '@material-ui/core/Tooltip';


// react components
import DrawerBottomPanelContainer from '../containers/DrawerBottomPanelContainer';
import Notification from './Notification';

// constant import
import { ACCEPTANCE } from '../constants';

const drawerWidth = 240;

const styles = () => ({
  avatar: {
    marginLeft: 20,
  },
  row: {
    padding: '12px 24px',
  },
  taskDrawer: {
    position: 'relative',
    paddingTop: '1em',
    color: 'white',
    background: grey[800],
    width: drawerWidth,
  },
  taskListItemText: {
    color: 'white',
    fontWidth: '700',
  },
  taskListItemIcon: {
    color: grey[400],
  },
  expander: {
    flexBasis: '100%',
  },
});

const inline = {
  taskPanelTitle: {
    display: 'flex',
    flexDirection: 'row',
    height: 80,
  },
  notification: {
    marginLeft: 'auto',
  },
};

const TaskPanel = (props) => {
  const {
    username, tasks, classes,
  } = props;
  return (
    <Drawer
      classes={{ paper: classes.taskDrawer }}
      variant="permanent"
      anchor="left"
    >
      <div style={inline.taskPanelTitle}>
        <Tooltip id="tooltip-username" title={username}>
          <Avatar className={classes.avatar}>{username ? username[0] : ''}</Avatar>
        </Tooltip>
        <div style={inline.notification} >
          <Notification tasks={tasks} />
        </div>
      </div>

      <List component="nav">
        {tasks.filter(task => task.permission.acceptance === ACCEPTANCE.ACCEPT)
          .map((task) => {
            const { tid, name } = task.info;
            const { onTaskClick } = props;
            return (
              <Link to={`/task/${tid}`} key={tid} style={{ textDecoration: 'none' }}>
                <ListItem button onClick={() => { onTaskClick(tid); }}>
                  <ListItemText
                    primary={name}
                    classes={{ primary: classes.taskListItemText }}
                  />
                </ListItem>
              </Link>
            );
          })
        }
      </List>
      <div className={classes.expander} />
      <DrawerBottomPanelContainer />
    </Drawer>
  );
};

export default withStyles(styles)(TaskPanel);
