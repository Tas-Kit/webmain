import React from 'react';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Typography from 'material-ui/Typography';

const styles = {
  appBar: {
    padding: '1em',
    textAlign: 'center',
  },
  flex: {
    flex: 1,
  },
};

const TaskAppBar = props => {
  const { taskTitle = '', classes } = props;
  return (
    <AppBar color="inherit" className={classes.appBar} position="static">
      <Typography variant="display1" color="inherit" className={classes.flex}>
        {taskTitle || 'Task List'}
      </Typography>
    </AppBar>
  );
};

export default withStyles(styles)(TaskAppBar);
