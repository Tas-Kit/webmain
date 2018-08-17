import React from 'react';
import { Toolbar, Button, Switch, FormControlLabel, Grid } from '@material-ui/core';
import { FormattedMessage } from 'react-intl';
import TaskAppSearchBarContainer from '../containers/TaskAppSearchBarContainer';

const TaskAppActionBar = (props) => {
  const {
    isCreatorMode, handleCreateAppClick, handleCreatorSwitchChange,
  } = props;
  const CreatorButton = (
    <Button
      color="primary"
      onClick={handleCreateAppClick}
    >
      <FormattedMessage id="createAppButton" />
    </Button>
  );
  return (
    <Toolbar style={{ padding: '1.5em 1em' }} >
      <Grid container spacing={16} justify="center">
        <Grid item xs={3} container justify="center" align-content="center">
          {isCreatorMode && CreatorButton}
        </Grid>
        <Grid item xs={6}>
          <TaskAppSearchBarContainer />
        </Grid>
        <Grid item xs={3} container justify="center" align-content="center">
          <FormControlLabel
            control={
              <Switch checked={isCreatorMode} onChange={handleCreatorSwitchChange} />
            }
            label={<FormattedMessage id="createAppLabel" />}
          />
        </Grid>

      </Grid>
    </Toolbar>
  );
};

export default TaskAppActionBar;
