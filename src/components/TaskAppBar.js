import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Typography from 'material-ui/Typography';

const styles = {
  appBar: {
    padding: '1em',
    textAlign: 'center'
  },
  root: {
    flexGrow: 1
  },
  flex: {
    flex: 1
  }
};

const TaskAppBar = props => {
  const { taskTitle = '', classes } = props;
  return (
    <div className={classes.root}>
      <AppBar color={'inherit'} className={classes.appBar} position="static">
        <Typography
          variant="display1"
          color="inherit"
          className={classes.flex}
        >{`Task List > ${taskTitle}`}</Typography>
      </AppBar>
    </div>
  );
};

export default withStyles(styles)(TaskAppBar);
