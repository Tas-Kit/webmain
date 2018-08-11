import React from 'react';
import { withStyles, Toolbar, Button, Switch, FormControlLabel } from '@material-ui/core';

const styles = {
  flex: {
    flex: 1,
  },
};

const TaskAppActionBar = (props) => {
  const {
    classes, isCreatorMode, handleCreateAppClick, handleCreatorSwitchChange,
  } = props;
  const CreatorButton = (
    <Button
      color="primary"
      onClick={handleCreateAppClick}
    >
      Create App
    </Button>
  );
  return (
    <Toolbar >
      <div className={classes.flex}>
        {isCreatorMode && CreatorButton}
      </div>
      <FormControlLabel
        control={
          <Switch checked={isCreatorMode} onChange={handleCreatorSwitchChange} />
        }
        label="Create App"
      />
    </Toolbar>
  );
};

export default withStyles(styles)(TaskAppActionBar);
