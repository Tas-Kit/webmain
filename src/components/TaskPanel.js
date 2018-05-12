import React from 'react';

// mui component imports
import List, { ListItem, ListItemText, ListItemIcon } from 'material-ui/List';
import Drawer from 'material-ui/Drawer';
import Grid from 'material-ui/Grid';
import Avatar from 'material-ui/Avatar';
import { withStyles } from 'material-ui/styles';
import grey from 'material-ui/colors/grey';

// svg imports
import TaskIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import NotificationIcon from '@material-ui/icons/Notifications';

// react components
import DrawerBottomPanelContainer from '../containers/DrawerBottomPanelContainer';

// constant import
import { ACCEPTANCE } from '../constants';

const drawerWidth = 240;

const styles = () => ({
  avatar: {},
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
  NotificationIcon: {
    transform: 'scale(1.5)',
  },
});

const TaskPanel = ({ tasks, handleTaskClick, classes }) => (
  <Drawer
    classes={{ paper: classes.taskDrawer }}
    variant="permanent"
    anchor="left"
  >
    <Grid
      container
      justify="space-between"
      alignItems="center"
      className={classes.row}
    >
      <Avatar className={classes.avatar}>YZ</Avatar>
      <NotificationIcon className={classes.NotificationIcon} />
    </Grid>

    <List component="nav">
      {Object.keys(tasks)
        .filter(id => tasks[id].has_task.acceptance === ACCEPTANCE.ACCEPT)
        .map((id) => {
          const task = tasks[id];
          return (
            <ListItem button key={id} onClick={handleTaskClick(id)}>
              <ListItemIcon className={classes.taskListItemIcon}>
                <TaskIcon />
              </ListItemIcon>
              <ListItemText
                primary={task.task.name}
                classes={{ primary: classes.taskListItemText }}
              />
            </ListItem>
          );
        })}
    </List>
    <DrawerBottomPanelContainer />
  </Drawer>
);

export default withStyles(styles)(TaskPanel);
