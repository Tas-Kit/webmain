import React from 'react';
import { withStyles, Toolbar, Button, Switch, FormControlLabel } from '@material-ui/core';
import { FormattedMessage } from 'react-intl';

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
      <FormattedMessage id="createAppButton" />
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
        label={<FormattedMessage id="createAppLabel" />}
      />
    </Toolbar>
  );
};

export default withStyles(styles)(TaskAppActionBar);
