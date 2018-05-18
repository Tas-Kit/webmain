let baseUrl = 'http://localhost:8001/api/v1';

if (typeof window !== 'undefined') {
  const { location } = window;
  baseUrl = `${location.protocol}//${location.host}/api/v1`; // (or whatever)
}

// const baseUrl = 'https://sandbox.tas-kit.com/api/v1';

const handleTimeOut = () => {
  if (window) {
    window.location.replace('/login');
  }
};

const defaultOnError = () => {
  throw new Error('Netowkr error');
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

export const fetchTasks = () => (
  fetch(`${baseUrl}/task/?format=json`, {
    headers: { Accept: 'application/json' },
    credentials: 'include',
  }).then(res => transformResponse(res))
);

export const fetchTaskGraph = taskId => (
  fetch(`${baseUrl}/task/graph/${taskId}`, {
    headers: { Accept: 'application/json' },
    credentials: 'include',
  }).then(res => transformResponse(res))
);

export default {
  fetchTasks,
  fetchTaskGraph,
};
