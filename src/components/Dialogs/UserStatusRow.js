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
    username, superole, role, acceptance, userId, handleRevokeInvitationClick, handleSuperRoleChange, handleRoleChange,
  } = props;

  return (
    <Grid container>
      <Grid item cs={3}>
        {username}
      </Grid>
      <Grid item cs={3}>
        {
          <Select value={superole} onChange={handleSuperRoleChange} >
            {Object.keys(SUPER_ROLE).map(key => (<MenuItem value={SUPER_ROLE[key]}>{SUPER_ROLES[SUPER_ROLE[key]]}</MenuItem>))}
          </Select>
        }
      </Grid>
      <Grid item cs={3}>
        {
          <Select value={role} onChange={handleRoleChange} >
            {Object.keys(SUPER_ROLE).map(key => (<MenuItem value={SUPER_ROLE[key]}>{SUPER_ROLES[SUPER_ROLE[key]]}</MenuItem>))}
          </Select>
        }
      </Grid>
      <Grid item cs={2}>
        <AcceptanceIcon acceptance={acceptance} />
      </Grid>
      <Grid item cs={1}>
        <IconButton onClick={handleRevokeInvitationClick(userId)}>
          <Close />
        </IconButton>
      </Grid>
    </Grid>);
};

export default UserStatusRow;
