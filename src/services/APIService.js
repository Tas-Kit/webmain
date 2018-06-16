import { dispatch } from './ReduxService';
import { sendRequest, receiveResponse } from '../actions/APIServiceActions';
import { DEV_BASE_URL, LOGIN_URL } from '../constants/apiUrls';

let baseUrl;

if (process.env.NODE_ENV === 'development') {
  baseUrl = DEV_BASE_URL;
} else {
  baseUrl = 'http://localhost:8001/api/v1';
  if (typeof window !== 'undefined') {
    const { location } = window;
    baseUrl = `${location.protocol}//${location.host}/api/v1`; // (or whatever)
  }
}

const defaultOnError = () => {
  throw new Error();
};

const handleTimeOut = () => {
  if (window) {
    window.location.replace(LOGIN_URL);
  }
};

const transformResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  switch (res.status) {
    case 401:
      handleTimeOut();
      break;
    default:
      defaultOnError();
  }
  return null;
};

class APIService {
  constructor() {
    this.lastRequestId = 0;
  }

  defaultOnError = () => {
    throw new Error('Netowkr error');
  };

  // Returns a promise with a boolean indicating success
  sendRequest = (url, type, data = {}, method = 'GET') => {
    this.lastRequestId += 1;
    const request = { id: this.lastRequestId, type, data };
    dispatch(sendRequest(request));
    const requestObject = {
      headers: { Accept: 'application/json' },
      credentials: 'include',
      method,
    };
    if (method === 'POST' || method === 'PATCH') {
      requestObject.headers['Content-Type'] = 'application/json';
      requestObject.body = JSON.stringify(data);
    }
    const response = { id: this.lastRequestId, type };
    return fetch(`${baseUrl}${url}`, requestObject)
      .then(res => transformResponse(res))
      .then((json) => {
        if (json) {
          response.json = json;
          dispatch(receiveResponse(response));
          return true;
        }
        return false;
      });
  };
}

export default new APIService();
