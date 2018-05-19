import React from 'react';
import { Link } from 'react-router-dom';

// mui component imports
import List, { ListItem, ListItemText } from 'material-ui/List';
import Drawer from 'material-ui/Drawer';
import Grid from 'material-ui/Grid';
import Avatar from 'material-ui/Avatar';
import { withStyles } from 'material-ui/styles';
import grey from 'material-ui/colors/grey';
import Tooltip from 'material-ui/Tooltip';


// react components
import DrawerBottomPanelContainer from '../containers/DrawerBottomPanelContainer';
import Notification from './Notification';

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
  expander: {
    flexBasis: '100%',
  },
});

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
      <Grid
        container
        justify="space-between"
        alignItems="center"
        className={classes.row}
      >
        <Tooltip id="tooltip-username" title={username}>
          <Avatar className={classes.avatar}>{username ? username[0] : ''}</Avatar>
        </Tooltip>

       <Notification tasks={tasks} />
      </Grid>

      <List component="nav">
        {tasks.filter(task => task.permission.acceptance === ACCEPTANCE.ACCEPT)
          .map((task) => {
            const { tid, name } = task.info;
            return (
              <Link to={`/main/task/${tid}`} key={tid} style={{ textDecoration: 'none' }}>
                <ListItem button>
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
