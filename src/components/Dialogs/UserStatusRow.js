import React from 'react';
import Grid from 'material-ui/Grid';
import IconButton from 'material-ui/IconButton';
import Close from '@material-ui/icons/Close';
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';
import AcceptanceIcon from "./AcceptanceIcon";

import { SUPER_ROLE, SUPER_ROLES } from '../../constants';

const UserStatusRow = props => {
  const {
    username, superole, role, roles, acceptance = 'a', userId, handleRevokeInvitationClick, handleSuperRoleChange, handleRoleChange,
  } = props;

  return (
    <Grid container>
      <Grid item cs={6}>
        {username}
      </Grid>
      <Grid item cs={6}>
        {
          <Select value={superole} onChange={handleSuperRoleChange} disabled={superole !== SUPER_ROLE.ADMIN />}>
            {Object.keys(SUPER_ROLE).map(key => (<MenuItem value={SUPER_ROLE[key]}>{SUPER_ROLES[SUPER_ROLE[key]]}</MenuItem>))}
          </Select>
        }
      </Grid>
      <Grid item cs={6}>
        {
          <Select value={role} onChange={handleRoleChange} disabled={superole === SUPER_ROLE.STANDARD} >
            {Object.keys(roles).map(key => (<MenuItem value={key}>{roles[key]}</MenuItem>))}
          </Select>
        }
      </Grid>
      <Grid item cs={4}>
        <AcceptanceIcon acceptance={acceptance} />
      </Grid>
      <Grid item cs={2}>
        <IconButton onClick={handleRevokeInvitationClick(userId)}>
          <Close />
        </IconButton>
      </Grid>
    </Grid>);
};

export default UserStatusRow;
