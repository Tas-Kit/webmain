import APIService from '../services/APIService';
import * as apiTypes from '../constants/apiTypes';
import { ACCEPTANCE } from '../constants';


export const rejectInvitation = (taskId) => {
  const url = `/task/invitation/respond/${taskId}/`;
  return APIService.sendRequest(url, apiTypes.QUIT_TASK, {
    acceptance: ACCEPTANCE.REJECT,
  }, 'POST');
};

export const acceptInvitation = (taskId) => {
  const url = `/task/invitation/respond/${taskId}/`;
  return APIService.sendRequest(url, apiTypes.ACCEPT_INVITATION, {
    acceptance: ACCEPTANCE.ACCEPT,
  }, 'POST');
};

export const getTask = () => {
  const url = '/task/?format=json';
  return APIService.sendRequest(url, apiTypes.GET_TASKS);
};


export default {
  rejectInvitation,
  acceptInvitation,
  getTask,
};
