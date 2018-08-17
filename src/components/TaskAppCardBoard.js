import React from 'react';
import { withStyles } from '@material-ui/core';
import { FormattedMessage } from 'react-intl';
import TaskAppCardContainer from '../containers/TaskAppCardContainer';
import { downloadTaskApp, getTask } from '../utils/api';

const styles = {
  root: {
    padding: '1em',
  },
  centerText: {
    textAlign: 'center',
  },
  gridContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, 360px)',
    gridGap: '1em',
    justifyContent: 'space-around',
  },
};

class TaskAppCardBoard extends React.Component {
  handleCardClick = (aid) => {
    const {
      showUpdateDialog, showPreviewDialog, isCreatorMode,
    } = this.props;
    if (isCreatorMode) {
      return () => showUpdateDialog(aid);
    }
    return () => showPreviewDialog(aid);
  }

  handleDownloadClick = aid => (e) => {
    const { showSnackMessage } = this.props;
    e.stopPropagation();
    downloadTaskApp(aid)
      .then(() => {
        showSnackMessage('You have successfully download the task app.');
        return getTask();
      })
      .catch(() => showSnackMessage('Network Error'));
  }

  render() {
    const {
      taskAppIds, classes, isLoading,
    } = this.props;

    const Cards = (
      <div className={classes.gridContainer}>
        {
          taskAppIds.map(id => (
            <TaskAppCardContainer
              key={id}
              taskAppId={id}
              handleCardClick={this.handleCardClick(id)}
              handleDownloadClick={this.handleDownloadClick(id)}
            />))
        }
      </div>);

    return (
      <div className={classes.root} >
        {isLoading && <p className={classes.centerText}><FormattedMessage id="loadingText" /></p>}
        {isLoading || (taskAppIds.length ? Cards : <p className={classes.centerText}>No app with this keyword exists.</p>)}
      </div>
    );
  }
}


export default withStyles(styles)(TaskAppCardBoard);
