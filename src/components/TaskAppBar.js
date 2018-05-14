import React from 'react';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';

import { APP_BAR_TITLE } from '../constants';

const styles = {
  appBar: {
    padding: '1em',
    textAlign: 'center',
    fontSize: APP_BAR_TITLE,
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
