// trigger build
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
import Shop from '@material-ui/icons/Shop';
import { Input } from '@material-ui/core';
import { FormattedMessage } from 'react-intl';

// react components
import DrawerBottomPanelContainer from '../containers/DrawerBottomPanelContainer';
import NotificationContainer from '../containers/NotificationContainer';
import MiniApp from '../assets/mini-app.svg';

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
    overflow: 'hidden',
    minHeight: 300,
  },
  taskListItemText: {
    color: 'white',
    fontWidth: '700',
    fontSize: 13,
  },
  taskListItemIcon: {
    color: grey[400],
  },
  expand: {
    flex: '1',
    overflow: 'auto',
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
  navContainer: {
    marginTop: '1em',
  },
  miniAppContainer: {
    marginLeft: '0.8em',
    paddingTop: 0,
  },
  highlight: {
    border: '1px white solid',
  },
});

const inline = {
  svgIcon: {
    top: 1.5,
    color: grey[400],
    position: 'relative',
  },
  miniApp: {
    top: 1.5,
    position: 'relative',
  },
  listItem: {
    paddingLeft: 5,
    paddingRight: 5,
  },
};

const TaskPanel = (props) => {
  const {
    username, tasks, classes, resetEditMode, filter, handleFilterChange,
    onTaskClick, needHighlightTid, resetNeedHighlightTid,
    miniAppList, openMiniApp,
  } = props;

  return (
    <Drawer
      classes={{ paper: classes.taskDrawer }}
      variant="permanent"
      anchor="left"
    >
      <div>
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
        <List className={classes.navContainer} component="nav">
          <Link to="/tastore" key="tastore" style={{ textDecoration: 'none' }}>
            <ListItem
              button
              onClick={() => {
                onTaskClick('tastore');
                resetEditMode();
              }}
              style={inline.listItem}
            >
              <ListItemIcon>
                <Shop style={inline.svgIcon} />
              </ListItemIcon>
              <ListItemText
                primary={<FormattedMessage id="tastoreText" />}
                classes={{ primary: classes.taskListItemText }}
              />
            </ListItem>
          </Link>
        </List>

        {/* mini-app 列表 */}
        <List className={classes.miniAppContainer} component="nav">
          {miniAppList.map(item => (
            <ListItem
              button
              onClick={() => openMiniApp(item.aid, item.app)}
              style={inline.listItem}
            >
              <ListItemIcon>
                <img alt="" src={MiniApp} style={inline.miniApp} />
              </ListItemIcon>
              <ListItemText
                primary={item.name}
                classes={{ primary: classes.taskListItemText }}
              />
            </ListItem>
          ))}
        </List>

        <form >
          <FormattedMessage id="filterPlaceholder">
            {
              txt => (
                <Input
                  id="filter"
                  placeholder={txt}
                  value={filter}
                  className={classes.input}
                  onChange={handleFilterChange}
                  fullWidth
                  margin="dense"
                />
              )
            }

          </FormattedMessage>

        </form>
      </div>
      <div className={classes.expand}>
        <List component="nav">
          {tasks.filter(task => task.permission.acceptance === ACCEPTANCE.ACCEPT && task.info.name.indexOf(filter) !== -1)
            .map((task) => {
              const { tid, name } = task.info;
              return (
                <Link to={`/task/${tid}`} key={tid} style={{ textDecoration: 'none' }}>
                  <ListItem
                    button
                    onClick={() => {
                      if (tid === needHighlightTid) resetNeedHighlightTid();
                      onTaskClick(tid);
                      resetEditMode();
                    }}
                    style={inline.listItem}
                    className={tid === needHighlightTid ? classes.highlight : ''}
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
      </div>
      <DrawerBottomPanelContainer />
    </Drawer>
  );
};

export default withStyles(styles)(TaskPanel);
