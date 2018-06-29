import React from 'react';
import { Link } from 'react-router-dom';

// mui component imports
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Drawer from '@material-ui/core/Drawer';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import grey from '@material-ui/core/colors/grey';
import Tooltip from '@material-ui/core/Tooltip';
import Grid from '@material-ui/core/Grid';
import Assignment from '@material-ui/icons/Assignment';
import { Input } from '@material-ui/core';


// react components
import DrawerBottomPanelContainer from '../containers/DrawerBottomPanelContainer';
import NotificationContainer from '../containers/NotificationContainer';

// constant import
import { ACCEPTANCE } from '../constants';
import { WHITE } from '../constants/colors';

const drawerWidth = 240;

const styles = () => ({
  row: {
  },
  taskDrawer: {
    position: 'relative',
    padding: '2em 1em',
    color: 'white',
    background: grey[800],
    width: drawerWidth,
  },
  taskListItemText: {
    color: 'white',
    fontWidth: '700',
    fontSize: 13,
  },
  taskListItemIcon: {
    color: grey[400],
  },
  expander: {
    flexBasis: '100%',
  },
  input: {
    color: WHITE,
    margin: '1.5em 0 0.5em',
    borderBottomColor: WHITE,
    '&:after': {
      borderColor: 'WHITE',
      color: 'WHITE',
    },
  },
});

const inline = {
  svgIcon: {
    top: 1.5,
    color: grey[400],
    position: 'relative',
  },
};

const TaskPanel = (props) => {
  const {
    username, tasks, classes, resetEditMode, filter, handleFilterChange,
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
          <Avatar >{username ? username[0] : ''}</Avatar>
        </Tooltip>

        <NotificationContainer />
      </Grid>
      <form >
        <Input
          id="filter"
          placeholder="Filter"
          value={filter}
          className={classes.input}
          onChange={handleFilterChange}
          fullWidth
          margin="dense"
        />
      </form>

      <List component="nav">
        {tasks.filter(task => task.permission.acceptance === ACCEPTANCE.ACCEPT && task.info.name.search(filter) !== -1)
          .map((task) => {
            const { tid, name } = task.info;
            const { onTaskClick } = props;
            return (
              <Link to={`/task/${tid}`} key={tid} style={{ textDecoration: 'none' }}>
                <ListItem
                  button
                  onClick={() => {
                    onTaskClick(tid);
                    resetEditMode();
                  }}
                >
                  <ListItemIcon>
                    <Assignment style={inline.svgIcon} />
                  </ListItemIcon>
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
