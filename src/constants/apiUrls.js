export const DEV_BASE_URL = 'http://sandbox.tas-kit.com/api/v1';
export const LOGIN_URL = '/web/basic/login';

export const USER_SERVICE_URL = '/userservice/userinfo/';
export const AUTHENTICATE_USER_URL = '/userservice/exempt/login/';

export const TASK_SERVICE_URL = '/taskservice/task/';

// invitation
export const TASK_INVITATION_URL = `${TASK_SERVICE_URL}invitation/`;
export const TASK_INVITATION_RESPOND_URL = `${TASK_INVITATION_URL}respond/`;
export const TASK_INVITATION_REVOKE_URL = `${TASK_INVITATION_URL}revoke/`;
export const TASK_INVITATION_CHANGE_URL = `${TASK_INVITATION_URL}change/`;

// graph
export const TASK_GRAPH_URL = `${TASK_SERVICE_URL}graph/`;

// trigger
export const TASK_TRIGGER_URL = `${TASK_SERVICE_URL}trigger/`;

// clone
export const TASK_CLONE_URL = `${TASK_SERVICE_URL}clone/`;

export const TASK_GET_URL = `${TASK_SERVICE_URL}?format=json`;

export const TASK_APP_BASE_URL = '/tastore/TaskApp/';

export const MINI_APP_BASE_URL = '/platform/miniapp/';

export const UPLOAD_IMAGE_URL = '/userservice/upload_image/';

export const IMAGE_CDN_URL = 'http://d48mbtbdhxub1.cloudfront.net';

export default {
  DEV_BASE_URL,
  LOGIN_URL,
  USER_SERVICE_URL,
  AUTHENTICATE_USER_URL,
  TASK_SERVICE_URL,
  TASK_INVITATION_URL,
  TASK_INVITATION_RESPOND_URL,
  TASK_INVITATION_REVOKE_URL,
  TASK_INVITATION_CHANGE_URL,
  TASK_GET_URL,
  TASK_GRAPH_URL,
  TASK_TRIGGER_URL,
  TASK_CLONE_URL,
  TASK_APP_BASE_URL,
  MINI_APP_BASE_URL,
  UPLOAD_IMAGE_URL,
  IMAGE_CDN_URL,
};
