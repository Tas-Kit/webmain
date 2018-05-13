import React from 'react';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';

const styles = {
  appBar: {
    padding: '1em',
    textAlign: 'center',
    fontSize: 20,
  },
  flex: {
    flex: 1,
  },
};

const TaskAppBar = (props) => {
  const { title = '', classes } = props;
  return (
    <AppBar className={classes.appBar} position="static" color="default">
      {title === '' ? 'Task List' : title}
    </AppBar>
  );
};

export default withStyles(styles)(TaskAppBar);
