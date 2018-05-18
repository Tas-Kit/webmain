import React from 'react';
import { Link } from 'react-router-dom';

// mui component imports
import List, { ListItem, ListItemText } from 'material-ui/List';
import Drawer from 'material-ui/Drawer';
import Grid from 'material-ui/Grid';
import Avatar from 'material-ui/Avatar';
import { withStyles } from 'material-ui/styles';
import grey from 'material-ui/colors/grey';

// svg imports
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
  expander: {
    flexBasis: '100%',
  },
});

const TaskPanel = ({ tasks, onTaskClick, classes }) => (
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
      {tasks.filter(task => task.permission.acceptance === ACCEPTANCE.ACCEPT)
        .map((task) => {
          const { tid, name } = task.info;
          return (
            <Link to={`/task/${tid}`} key={tid} style={{ textDecoration: 'none' }}>
              <ListItem button onClick={onTaskClick(tid)}>
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

export default withStyles(styles)(TaskPanel);
