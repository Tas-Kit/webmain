import { dispatch } from './ReduxService';
import { sendRequest, receiveResponse } from '../actions/APIServiceActions';

let baseUrl = 'http://localhost:8001/api/v1';

if (typeof window !== 'undefined') {
  const { location } = window;
  baseUrl = `${location.protocol}//${location.host}/api/v1`; // (or whatever)
}

// const baseUrl = 'https://sandbox.tas-kit.com/api/v1';

const defaultOnError = () => {
  throw new Error('Netowkr error');
};

const handleTimeOut = () => {
  if (window) {
    window.location.replace('/login');
  }
};

const transformResponse = (res, onError = defaultOnError) => {
  if (res.ok) { return res.json(); }
  switch (res.status) {
    case 401:
      handleTimeOut();
      break;
    default:
      onError(res);
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
    return fetch(`${baseUrl}${url}`, requestObject)
      .then(res => transformResponse(res))
      .then((json) => {
        if (json) {
          const response = { type, json };
          console.log(`${type}:`, json);
          dispatch(receiveResponse(response));
          return true;
        }
        return false;
      });
  }
}

export default new APIService();
