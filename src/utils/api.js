import qs from 'qs';
import APIService from '../services/APIService';
import * as apiTypes from '../constants/apiTypes';
import { ACCEPTANCE } from '../constants';
import {
  TASK_INVITATION_URL, TASK_INVITATION_RESPOND_URL,
  TASK_INVITATION_REVOKE_URL, TASK_GET_URL,
  TASK_INVITATION_CHANGE_URL,
  TASK_APP_BASE_URL,
  DEV_BASE_URL,
  UPLOAD_IMAGE_URL,
} from '../constants/apiUrls';


let baseUrl;
const imagePath = '/task/description/jpg/';

if (process.env.NODE_ENV === 'development') {
  baseUrl = DEV_BASE_URL;
} else {
  baseUrl = 'http://localhost:8001/api/v1';
  if (typeof window !== 'undefined') {
    const { location } = window;
    baseUrl = `${location.protocol}//${location.host}/api/v1`; // (or whatever)
  }
}


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

export const getTaskApps = (keyword, aid) => {
  const queryField = {};
  if (keyword) queryField.keyword = keyword;
  if (aid) queryField.author_id = aid;
  const query = qs.stringify(queryField);
  const url = `${TASK_APP_BASE_URL}?${query}`;
  return APIService.sendRequest(url, apiTypes.GET_CURRENT_TASK_APP);
};

export const createTaskApp = (payload) => {
  const url = TASK_APP_BASE_URL;
  return APIService.sendRequest(url, apiTypes.CREATE_TASK_APP, payload, 'POST', 'formData');
};

export const updateTaskApp = (appId, payload) => {
  const url = `${TASK_APP_BASE_URL}${appId}/`;
  console.log(payload);
  return APIService.sendRequest(url, apiTypes.UPDATE_TASK_APP, payload, 'PATCH', 'formData');
};

export const previewTaskApp = (appId) => {
  const url = `${baseUrl}${TASK_APP_BASE_URL}${appId}/download/`;
  return fetch(url, {
    headers: { Accept: 'application/json' },
    credentials: 'include',
    method: 'GET',
  }).then(res => res.json());
};
export const downloadTaskApp = (appId) => {
  const url = `${TASK_APP_BASE_URL}${appId}/download/`;
  return APIService.sendRequest(url, apiTypes.DOWNLOAD_TASK_APP, {}, 'POST', 'formData');
};
export const uploadTaskApp = (appId, payload) => {
  const url = `${TASK_APP_BASE_URL}${appId}/upload/`;
  return APIService.sendRequest(url, apiTypes.UPLOAD_TASK_APP, payload, 'POST', 'formData');
};
export const uploadImage = (file) => {
  const url = `${UPLOAD_IMAGE_URL}`;
  const payload = new FormData();
  payload.append('path', imagePath);
  payload.append('image', file);
  return APIService.sendRequest(url, '', payload, 'POST', 'multipart');
};

export default {
  rejectInvitation,
  acceptInvitation,
  getTask,
  revokeInvitation,
  changeUserSuperRole,
  changeUserRole,
};
