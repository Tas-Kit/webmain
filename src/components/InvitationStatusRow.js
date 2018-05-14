import React from 'react';
import Grid from 'material-ui/Grid';
import IconButton from 'material-ui/IconButton';
import Close from '@material-ui/icons/Close';
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';
import AcceptanceIcon from './AcceptanceIcon';
import { withStyles } from 'material-ui/styles';

import { SUPER_ROLE, SUPER_ROLES } from '../../constants';

const styles = {
  userStatusRow: {
    padding: '0 0.5em',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  flex3: {
    flex: 3,
  },
  flex2: {
    flex: 2,
  },
  flex1: {
    flex: 1,
  },
  deleteButton: {
    color: 'red',
  },
};

const UserStatusRow = props => {
  const {
    username, superole, role, roles, acceptance, userId, handleRevokeInvitationClick, handleSuperRoleChange, handleRoleChange, classes,
  } = props;

  return (
    <div className={classes.userStatusRow} container spacing={8}>
      <div className={classes.flex3}>
        {username}
      </div>
      <div className={classes.flex3}>
        <Select value={superole} onChange={handleSuperRoleChange(userId)} disabled={superole === SUPER_ROLE.OWNER}>
          {Object.keys(SUPER_ROLE).map(key => (<MenuItem key={key} value={SUPER_ROLE[key]}>{SUPER_ROLES[SUPER_ROLE[key]]}</MenuItem>))}
        </Select>
      </div>
      <div className={classes.flex3}>
        <Select value={role || 'none'} onChange={handleRoleChange(userId)} disabled={superole === SUPER_ROLE.STANDARD} >
          {roles.length ? roles.map(el => (<MenuItem key={el} value={el}>{el}</MenuItem>)) : <MenuItem value="none" >None</MenuItem>}
        </Select>
      </div>
      <div className={classes.flex1}>
        <AcceptanceIcon acceptance={acceptance} />

      </div>
      <div className={classes.flex1} >
        <IconButton className={classes.deleteButton} onClick={handleRevokeInvitationClick(userId)}>
          <Close />
        </IconButton>
      </div>
    </div>);
};

export default withStyles(styles)(UserStatusRow);
