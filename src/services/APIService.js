import { dispatch } from './ReduxService';
import { sendRequest, receiveResponse } from '../actions/APIServiceActions';

const defaultOnError = () => {
  throw new Error('Netowkr error');
};

const handleTimeOut = () => {
  if (window) {
    window.location.replace('/login');
  }
};

const transformResponse = (res, onError = defaultOnError) => {
  if (res.ok) {
    return res.json();
  }
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

  sendRequest = (method = 'GET', requestUrl, type, data = {}) => {
    this.lastRequestId += 1;
    const request = { id: this.lastRequestId, type, data };
    dispatch(sendRequest(request));
    fetch(requestUrl, {
      headers: { Accept: 'application/json' },
      credentials: 'include',
      method,
    }).then(res => transformResponse(res))
      .then((jsonData) => {
        if (jsonData) {
          const response = { type, jsonData };
          dispatch(receiveResponse(response));
        }
      });
  }
}

export default new APIService();
