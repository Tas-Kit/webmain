import { dispatch } from './ReduxService';
import { sendRequest, receiveResponse } from '../actions/APIServiceActions';

// let baseUrl = 'http://localhost:8001/api/v1';
//
// if (typeof window !== 'undefined') {
//   const { location } = window;
//   baseUrl = `${location.protocol}//${location.host}/api/v1`; // (or whatever)
// }

const baseUrl = 'https://sandbox.tas-kit.com/api/v1';

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

  sendRequest = (url, type, data = {}, method = 'GET') => {
    this.lastRequestId += 1;
    const request = { id: this.lastRequestId, type, data };
    dispatch(sendRequest(request));
    fetch(`${baseUrl}${url}`, {
      headers: { Accept: 'application/json' },
      credentials: 'include',
      method,
    }).then(res => transformResponse(res))
      .then((json) => {
        if (json) {
          const response = { type, json };
          dispatch(receiveResponse(response));
        }
      });
  }
}

export default new APIService();
