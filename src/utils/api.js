var baseUrl = 'http://localhost:8001/api/v1';

if (typeof window !== 'undefined') {
  var location = window.location;
  baseUrl = location.protocol + '//' + location.host + '/api/v1'; // (or whatever)
}

export const fetchTasks = () => {
  return fetch(`${baseUrl}/task/?format=json`, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    credentials: 'include'
  }).then(res => {
    if (res.ok) {
      return res.json();
    } else {
      console.log(res);
      throw new Error('Failed to fetch tasks');
    }
  });
};

export const fetchTaskGraph = taskId => {
  return fetch(`${baseUrl}/task/graph/${taskId}`, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    credentials: 'include'
  }).then(res => {
    if (res.ok) {
      return res.json();
    } else {
      console.log(res);
      throw new Error('Failed to fetch tasks');
    }
  });
};

const adaptTasks = tasks => {
  let keys = Object.keys(tasks);
  let outputTasks = keys.map(key => {
    return {
      id: key,
      task: tasks[key]['task'],
      relationship: tasks[key]['relationship']
    };
  });
  return outputTasks;
};

export default {
  fetchTasks,
  fetchTaskGraph,
  adaptTasks
};
