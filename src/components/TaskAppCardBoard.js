import React from 'react';
import { Grid, withStyles } from '@material-ui/core';
import TaskAppCardContainer from '../containers/TaskAppCardContainer';

const styles = {
  root: {
    padding: '1em',
  },
};

const TaskAppCardBoard = (props) => {
  const { taskAppIds, classes } = props;
  return (
    <div className={classes.root}>
      <Grid container spacing={24}>
        {taskAppIds.map(id => (
          <Grid key={id} item xs={4}>
            <TaskAppCardContainer taskAppId={id} />
          </Grid>))}
      </Grid>
    </div>
  );
};

export default withStyles(styles)(TaskAppCardBoard);
