import APIService from '../services/APIService';
import * as apiTypes from '../constants/apiTypes';
import { ACCEPTANCE } from '../constants';


export const rejectInvitation = (taskId) => {
  const url = `/taskservice/task/invitation/respond/${taskId}/`;
  return APIService.sendRequest(url, apiTypes.QUIT_TASK, {
    acceptance: ACCEPTANCE.REJECT,
  }, 'POST');
};

export const acceptInvitation = (taskId) => {
  const url = `/taskservice/task/invitation/respond/${taskId}/`;
  return APIService.sendRequest(url, apiTypes.ACCEPT_INVITATION, {
    acceptance: ACCEPTANCE.ACCEPT,
  }, 'POST');
};

export const getTask = () => {
  const url = '/taskservice/task/?format=json';
  return APIService.sendRequest(url, apiTypes.GET_TASKS);
};

export const revokeInvitation = (tid, payload) => {
  const revokeUrl = `/taskservice/task/invitation/revoke/${tid}/`;
  return APIService.sendRequest(revokeUrl, apiTypes.REVOKE_INVITATION, payload, 'POST');
};

export const createInvitation = (tid, payload) => {
  const inviteUrl = `/taskservice/task/invitation/${tid}/`;
  return APIService.sendRequest(inviteUrl, apiTypes.CREATE_INVITATION, payload, 'POST');
};

export const changeUserSuperRole = (tid, payload) => {
  const changeUrl = `/taskservice/task/invitation/change/${tid}/`;
  return APIService.sendRequest(changeUrl, 'change_superrole', payload, 'POST');
};

export const changeUserRole = (tid, payload) => {
  const changeUrl = `/taskservice/task/invitation/change/${tid}/`;
  return APIService.sendRequest(changeUrl, 'change_role', payload, 'POST');
};

export default {
  rejectInvitation,
  acceptInvitation,
  getTask,
  revokeInvitation,
  changeUserSuperRole,
  changeUserRole,
};
