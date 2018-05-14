import React from 'react';
import classNames from 'classnames';
import { withStyles, Avatar } from 'material-ui';

// ui components
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import Button from 'material-ui/Button';

// svgs
import SupervisorAccount from '@material-ui/icons/SupervisorAccount';

// i18n
import { FormattedMessage } from 'react-intl';

import {
  THIRD,
  FOURTH,
  TRANSPARENT_THIRD,
  TRANSPARENT_FOURTH,
} from '../constants/colors';

const styles = {
  flex: {
    flex: 1,
  },
  letterAvatar: {
    width: 31,
    height: 31,
    fontSize: 16,
  },
  saveBt: {
    color: THIRD,
    '&:hover': { backgroundColor: TRANSPARENT_THIRD },
  },
  cloneBt: {
    color: FOURTH,
    '&:hover': { backgroundColor: TRANSPARENT_FOURTH },
  },
};

const TaskToolbar = props => {
  const {
    classes,
    users = ['YZ'],
    toggleTaskInfo,
    toggleDeleteTask,
  } = props;

  return (
    <Toolbar>
      <div className={classes.flex}>
        <Button key="info" color="primary" onClick={toggleTaskInfo}>
          <FormattedMessage id="infoButton" defaultMessage="Info" />
        </Button>
        <Button
          key="clone"
          className={classNames(classes.cloneBt)}
        >
          <FormattedMessage id="cloneButton" defaultMessage="Clone" />
        </Button>
        <Button key="save" className={classNames(classes.saveBt)}>
          <FormattedMessage id="saveButton" defaultMessage="Save" />
        </Button>
        <Button
          key="delete"
          color="secondary"
          onClick={toggleDeleteTask}
        >
          <FormattedMessage id="deleteButton" defaultMessage="Delete" />
        </Button>
      </div>
      {Object.keys(users).map(id => {
        const user = users[id];
        return (
          <Avatar key={id} className={classes.letterAvatar}>
            {`${user.basic.first_name[0]}${user.basic.last_name[0]}`}
          </Avatar>
        );
      })}
      <IconButton color="inherit" aria-label="Invitation">
        <SupervisorAccount />
      </IconButton>
    </Toolbar>
  );
};

export default withStyles(styles)(TaskToolbar);
