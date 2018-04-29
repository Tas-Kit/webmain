const baseUrl = 'http://localhost:8001/api/v1';

const fetchTasks = () => {
  return fetch(`${baseUrl}/task/?format=json`, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    credentials: 'include'
  });
};

const adaptTasks = tasks => {
  let keys = Object.keys(tasks);
  let outputTasks = keys.map(key => {
    return {
      taskId: key,
      task: tasks[key]['task'],
      relationship: tasks[key]['relationship']
    };
  });
  return outputTasks;
};

export default {
  fetchTasks,
  adaptTasks
};
