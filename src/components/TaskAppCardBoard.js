import React from 'react';
import { Grid, withStyles } from '@material-ui/core';
import TaskAppCardContainer from '../containers/TaskAppCardContainer';
import { downloadTaskApp } from '../utils/api';

const styles = {
  root: {
    padding: '1em',
  },
};

class TaskAppCardBoard extends React.Component {
  handleCardClick = (aid) => {
    const {
      showUpdateDialog, isCreatorMode,
    } = this.props;
    if (isCreatorMode) {
      return () => showUpdateDialog(aid);
    }
    return () => { };
  }

  handleDownloadClick = aid => (e) => {
    e.stopPropagation();
    downloadTaskApp(aid);
  }

  render() {
    const {
      taskAppIds, classes,
    } = this.props;

    return (
      <div className={classes.root}>
        <Grid container spacing={24}>
          {
            taskAppIds.map(id => (
              <Grid key={id} item xs={4}>
                <TaskAppCardContainer
                  taskAppId={id}
                  handleCardClick={this.handleCardClick(id)}
                  handleDownloadClick={this.handleDownloadClick(id)}
                />
              </Grid>))
          }
        </Grid>
      </div>
    );
  }
}


export default withStyles(styles)(TaskAppCardBoard);
