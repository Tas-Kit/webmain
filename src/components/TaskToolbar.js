import React from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

// ui components
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import { Tooltip } from '@material-ui/core';

// svgs
import SupervisorAccount from '@material-ui/icons/SupervisorAccount';

// i18n
import { FormattedMessage } from 'react-intl';

import { LoadingButton } from './Button';

import {
  TEAL,
  ORANGE,
  TRANSPARENT_TEAL,
  TRANSPARENT_ORANGE,
} from '../constants/colors';
import { LETTER_AVARTAR, SUPER_ROLE } from '../constants';

const styles = {
  flex: {
    flex: 1,
  },
  letterAvatar: {
    width: 31,
    height: 31,
    fontSize: LETTER_AVARTAR,
    margin: '0 0.25em',
  },
  saveBt: {
    color: TEAL,
    '&:hover': { backgroundColor: TRANSPARENT_TEAL },
  },
  cloneBt: {
    color: ORANGE,
    '&:hover': { backgroundColor: TRANSPARENT_ORANGE },
  },
};

const TaskToolbar = (props) => {
  const {
    classes,
    users,
    userSuperRole,
    toggleDeleteTask,
    toggleTaskEditor,
    toggleInvitation,
    toggleQuitTask,
    onGraphSave,
    savePending,
  } = props;

  return (
    <Toolbar>
      <div className={classes.flex}>
        <Button key="info" color="primary" onClick={toggleTaskEditor}>
          <FormattedMessage id="infoButton" defaultMessage="Info" />
        </Button>
        <Button
          key="clone"
          className={classNames(classes.cloneBt)}
        >
          <FormattedMessage id="cloneButton" defaultMessage="Clone" />
        </Button>
        <LoadingButton
          buttonName="Save"
          color={TEAL}
          loading={savePending}
          onClick={onGraphSave}
          className={classNames(classes.saveBt)}
        />

        {
          userSuperRole === SUPER_ROLE.OWNER ?
            (
              <Button
                key="delete"
                color="secondary"
                onClick={toggleDeleteTask}
              >
                <FormattedMessage id="deleteButton" defaultMessage="Delete" />
              </Button>)
            : (
              <Button
                key="quit"
                color="secondary"
                onClick={toggleQuitTask}
              >
                <FormattedMessage id="quitButton" defaultMessage="Quit" />
              </Button>)
        }
      </div>
      {users.slice(0, 5).map(user => (
        <Tooltip key={user.basic.uid} id={`tooltip-user-${user.basic.username}`} title={user.basic.username}>
          <Avatar className={classes.letterAvatar}>
            {`${user.basic.username[0]}`}
          </Avatar>
        </Tooltip>
      ))
      }
      {users.length > 5 && <span>...</span>}
      <IconButton color="inherit" aria-label="Invitation" onClick={toggleInvitation} >
        <SupervisorAccount />
      </IconButton>
    </Toolbar >
  );
};

export default withStyles(styles)(TaskToolbar);
