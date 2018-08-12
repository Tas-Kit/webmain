import APIService from '../services/APIService';
import * as apiTypes from '../constants/apiTypes';
import { ACCEPTANCE } from '../constants';
import {
  TASK_INVITATION_URL, TASK_INVITATION_RESPOND_URL,
  TASK_INVITATION_REVOKE_URL, TASK_GET_URL,
  TASK_INVITATION_CHANGE_URL,
  TASK_APP_BASE_URL,
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

export const getTaskApps = () => {
  const url = TASK_APP_BASE_URL;
  return APIService.sendRequest(url, apiTypes.GET_CURRENT_TASK_APP);
};

export const createTaskApp = (payload) => {
  const url = TASK_APP_BASE_URL;
  return APIService.sendRequest(url, apiTypes.CREATE_TASK_APP, payload, 'POST', 'formData');
};

export const updateTaskApp = (appId, payload) => {
  const url = `${TASK_APP_BASE_URL}${appId}/`;
  return APIService.sendRequest(url, apiTypes.UPDATE_TASK_APP, payload, 'POST');
};

export const previewTaskApp = (appId) => {
  const url = `${TASK_APP_BASE_URL}${appId}/download/`;
  return APIService.sendRequest(url, apiTypes.PREVIEW_TASK_APP);
};
export const downloadTaskApp = (appId) => {
  const url = `${TASK_APP_BASE_URL}${appId}/download/`;
  return APIService.sendRequest(url, apiTypes.DOWNLOAD_TASK_APP, {}, 'POST');
};
export const uploadTaskApp = (appId, payload) => {
  const url = `${TASK_APP_BASE_URL}${appId}/download/`;
  return APIService.sendRequest(url, apiTypes.UPLOAD_TASK_APP, payload, 'POST');
};


export default {
  rejectInvitation,
  acceptInvitation,
  getTask,
  revokeInvitation,
  changeUserSuperRole,
  changeUserRole,
};
