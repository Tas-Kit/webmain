import APIService from '../services/APIService';
import * as apiTypes from '../constants/apiTypes';
import { ACCEPTANCE } from '../constants';
import {
  TASK_INVITATION_URL, TASK_INVITATION_RESPOND_URL,
  TASK_INVITATION_REVOKE_URL, TASK_GET_URL,
  TASK_INVITATION_CHANGE_URL,
} from '../constants/apiUrls';


export const rejectInvitation = (taskId) => {
  const url = `${TASK_INVITATION_RESPOND_URL}${taskId}/`;
  return APIService.sendRequest(url, apiTypes.QUIT_TASK, {
    acceptance: ACCEPTANCE.REJECT,
  }, 'POST');
};

export const acceptInvitation = (taskId) => {
  const url = `${TASK_INVITATION_RESPOND_URL}${taskId}/`;
  return APIService.sendRequest(url, apiTypes.ACCEPT_INVITATION, {
    acceptance: ACCEPTANCE.ACCEPT,
  }, 'POST');
};

export const getTask = () => {
  const url = `${TASK_GET_URL}`;
  return APIService.sendRequest(url, apiTypes.GET_TASKS);
};

export const revokeInvitation = (tid, payload) => {
  const revokeUrl = `${TASK_INVITATION_REVOKE_URL}${tid}/`;
  return APIService.sendRequest(revokeUrl, apiTypes.REVOKE_INVITATION, payload, 'POST');
};

export const createInvitation = (tid, payload) => {
  const inviteUrl = `${TASK_INVITATION_URL}${tid}/`;
  return APIService.sendRequest(inviteUrl, apiTypes.CREATE_INVITATION, payload, 'POST');
};

export const changeUserSuperRole = (tid, payload) => {
  const changeUrl = `${TASK_INVITATION_CHANGE_URL}${tid}/`;
  return APIService.sendRequest(changeUrl, 'change_superrole', payload, 'POST');
};

export const changeUserRole = (tid, payload) => {
  const changeUrl = `${TASK_INVITATION_CHANGE_URL}${tid}/`;
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
