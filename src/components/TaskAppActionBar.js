import React from 'react';
import { withStyles, Toolbar, Button, Switch } from '@material-ui/core';

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
      <Switch label="Create App" checked={isCreatorMode} onChange={handleCreatorSwitchChange} />
    </Toolbar>
  );
};

export default withStyles(styles)(TaskAppActionBar);
