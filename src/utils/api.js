let baseUrl = 'http://localhost:8001/api/v1';

if (typeof window !== 'undefined') {
  const { protocol, host } = window.location;
  baseUrl = `${protocol}//${host}/api/v1`; // (or whatever)
}

const handleTimeOut = () => {
  if (window) {
    window.location.replace('/login');
  }
};

const defaultOnError = res => {
  throw new Error('Netowkr error');
};

const transformResponse = (res, onError = defaultOnError) => {
  console.log(res);
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
};

export const fetchTasks = () => {
  return fetch(`${baseUrl}/task/?format=json`, {
    headers: {
      Accept: 'application/json',
    },
    credentials: 'include',
  }).then(res => {
    return transformResponse(res);
  });
};

export const fetchTaskGraph = taskId => {
  return fetch(`${baseUrl}/task/graph/${taskId}`, {
    headers: {
      Accept: 'application/json',
    },
    credentials: 'include',
  }).then(res => {
    return transformResponse(res);
  });
};

export default {
  fetchTasks,
  fetchTaskGraph,
};
