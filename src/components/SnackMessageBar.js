import React from 'react';
import { withStyles } from 'material-ui/styles';
import Snackbar from 'material-ui/Snackbar';
import IconButton from 'material-ui/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import { ORANGE } from '../constants/colors';

const styles = theme => ({
  close: {
    width: theme.spacing.unit * 4,
    height: theme.spacing.unit * 4,
  },
});

const SnackMessageBar = (props) => {
  const { classes, openState, toggle, message } = props;
  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={openState}
        autoHideDuration={3000}
        onClose={toggle}
        ContentProps={{ 'aria-describedby': 'message-id' }}
        message={<span style={{ color: ORANGE }}>{message}</span>}
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            className={classes.close}
            onClick={toggle}
          >
            <CloseIcon />
          </IconButton>,
        ]}
      />
    </div>
  );
};

export default withStyles(styles)(SnackMessageBar);
