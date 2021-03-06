import qs from 'qs';
import { dispatch } from './ReduxService';
import { sendRequest, receiveResponse } from '../actions/APIServiceActions';
import { DEV_BASE_URL } from '../constants/apiUrls';
import { redirectToLogin } from '../utils/functions';

let apiBaseUrl;

if (process.env.NODE_ENV === 'development') {
  apiBaseUrl = DEV_BASE_URL;
} else {
  apiBaseUrl = 'http://localhost:8001/api/v1';
  if (typeof window !== 'undefined') {
    const { location } = window;
    apiBaseUrl = `${location.protocol}//${location.host}/api/v1`; // (or whatever)
  }
}

const handleTimeOut = (currPath) => {
  redirectToLogin(currPath);
};

const transformResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  switch (res.status) {
    case 404:
      return null;
    case 401:
      handleTimeOut(window.location.pathname);
      throw new Error(res);
    case 400:
      return null;
    default:
      throw new Error(res);
  }
};

class APIService {
  constructor() {
    this.lastRequestId = 0;
  }

  defaultOnError = () => {
    throw new Error('Netowkr error');
  };

  // Returns a promise with a boolean indicating success
  sendRequest = (url, type, data = {}, method = 'GET', contentType = 'json') => {
    this.lastRequestId += 1;
    const request = { id: this.lastRequestId, type, data };
    dispatch(sendRequest(request));
    const requestObject = {
      headers: { Accept: 'application/json' },
      credentials: 'include',
      method,
    };
    if (method === 'POST' || method === 'PATCH') {
      if (contentType === 'json') {
        requestObject.headers['Content-Type'] = 'application/json';
        requestObject.body = JSON.stringify(data);
      } else if (contentType === 'formData') {
        requestObject.headers['Content-Type'] = 'application/x-www-form-urlencoded';
        requestObject.body = qs.stringify(data);
      } else if (contentType === 'multipart') {
        requestObject.body = data;
      }
    }
    const response = { id: this.lastRequestId, type };
    return fetch(`${apiBaseUrl}${url}`, requestObject)
      .then(res => transformResponse(res))
      .then((json) => {
        if (json) {
          console.log(response);
          response.json = json;
          dispatch(receiveResponse(response));
          return json;
        }
        return null;
      });
  };
}

const baseUrl = apiBaseUrl;

export default new APIService();
export { baseUrl };
